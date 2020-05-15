const stripe = require('stripe')('sk_test_MUKrgdzRDZoHZJ1lOnwOFOgB00Bs91Zc1P');
const bodyParser = require('body-parser')

const endpointSecret = process.env.stripe_signature_secret || '';

export const config = {
    api: {
        bodyParser: false,
    },
}

const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, result => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async (req, res) => {
    await runMiddleware(req, res, bodyParser.raw({type: 'application/json'}))
    const sig = req.headers['stripe-signature'];
    const body = req.body;

    let event = null;
    
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        // invalid signature
        console.log(err.message)
        res.status(400).end();
        return;
    }

    let intent = null;
    switch (event['type']) {
        case 'payment_intent.succeeded':
            intent = event.data.object;
            res.status(200)
            break;
        case 'payment_intent.payment_failed':
            intent = event.data.object;
            const message = intent.last_payment_error && intent.last_payment_error.message;
            res.status(400).send(message)
            break;
    }

    res.end()
}