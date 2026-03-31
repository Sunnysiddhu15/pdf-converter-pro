const express = require('express');
const stripe = require('stripe')('your_stripe_secret_key');

const router = express.Router();

// Endpoint to create a new payment
router.post('/create-payment', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });
        res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Endpoint to handle subscription
router.post('/subscribe', async (req, res) => {
    const { paymentMethodId } = req.body;
    try {
        const customer = await stripe.customers.create({
            payment_method: paymentMethodId,
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: 'your_plan_id' }], // replace 'your_plan_id' with actual plan ID
            expand: ['latest_invoice.payment_intent'],
        });

        res.status(200).send({ subscription });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;