const paymentService = require('../../pkg/services/payment');

exports.getPayment = (req, res) => {
    //TODO: Make here getPayment procedure
};

exports.createPayment = async (req, res) => {
    try {
        const { amount, currency, method } = req.paymentData;

        const payment = await paymentService.makePayment(amount, currency, method);

        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json(
            { error: '' }
        );
    }
};