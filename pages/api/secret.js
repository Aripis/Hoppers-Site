const stripe = require('stripe')('sk_test_MUKrgdzRDZoHZJ1lOnwOFOgB00Bs91Zc1P');

export default async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.query.price*100,
        currency: 'bgn',
        // Verify your integration in this guide by including this parameter
        metadata: { integration_check: 'accept_a_payment' },
    });
    res.json({client_secret: paymentIntent.client_secret});
}
