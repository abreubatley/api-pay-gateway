const router = express.Router();

const express = require('express');
const { getPayment, createPayment } = require('../handlers/payments');
const validatePaymentRequest = require('../middlewares/validatePaymentRequest');

router.post('/', validatePaymentRequest, createPayment);
router.get('/:paymentId', getPayment);

module.exports = router;