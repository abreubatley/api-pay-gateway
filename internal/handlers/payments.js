const paymentService = require('../services/payment');
const {Payment} = require('../models/payment');

exports.getPayment = (req, res) => {
    //TODO: Make here getPayment procedure
};

exports.createPayment = async (req, res) => {
    try {
        const { amount, currency, method } = req.paymentData;

        const payment = await paymentService.makePayment(amount, currency);

        const paymentEntity = await Payment.create(
            {
                paymentGatewayId: payment.paymentId,
                amount: amount,
                currency: currency,
                method: method,
                status: payment.status
            }
        );

        res.status(201).json({paymentId: paymentEntity.paymentGatewayId, status: paymentEntity.status});
    } catch (error) {
        console.error(error.stack);

        res.status(500).json(
            { error: 'internal server error', code: "INTERNAL_ERROR"}
        );
    }
};