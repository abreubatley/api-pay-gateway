const express = require('express');
const router = express.Router();

const { getPayment, createPayment } = require('../../internal/handlers/payments');
const validatePaymentRequest = require('../../internal/middlewares/validatePaymentRequest');

router.post('/', validatePaymentRequest, createPayment);
router.get('/:paymentId', getPayment);

module.exports = router;