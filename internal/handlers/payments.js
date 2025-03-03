const paymentService = require('../services/payment');
const prisma = require("../prisma/prismaClient");

exports.createPayment = async (req, res) => {
    try {
        const { amount, currency, method } = req.body;

        const payment = await paymentService.makePayment(amount, currency);

        const newUser = await prisma.payment.create({
            data: {
                paymentGatewayId: payment.paymentId,
                amount: amount,
                currency: currency,
                method: method,
                status: payment.status,
            },
        });
        console.log('User created:', newUser);

        res.status(201).json({ id: paymentEntity.id, status: paymentEntity.status });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'internal server error', code: "INTERNAL_ERROR" });
    }
};

exports.getPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await getPaymentById(id);

        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }

        res.status(200).json({ status: payment.status });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'internal server error', code: "INTERNAL_ERROR" });
    }
};
