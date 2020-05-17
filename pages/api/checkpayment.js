const stripe = require('stripe')('sk_test_MUKrgdzRDZoHZJ1lOnwOFOgB00Bs91Zc1P');

export default async (req, res) => {
    const intent = await stripe.paymentIntents.retrieve(req.query.id);
    const charges = intent.charges.data;
    if(charges[0].status === 'succeeded') {
        res.status(200)
    } else {
        if(charges[0]){
            res.status(charges[0].failure_code).send(charges[0].failure_message);
        } else {
            res.status(400)
        }
    }
    res.end();
}