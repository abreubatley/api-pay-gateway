const Payment = require('../models/payment');
const Helpers = require('../../pkg/utils/helpers');
const { Currencies, PaymentMethods } = require('../../pkg/utils/enums');


const validatePaymentRequest = (req, res, next) => {
    const { amount, currency, method } = req.body;
    const errorList = [];

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
        errorList.push({ field: "amount", value: amount, error: "must be a positive number" });
    }

    if (!Helpers.isValidAmount(amount)) {
        errorList.push({ field: "amount", value: amount, error: "must have only 2 decimal places" });
    }

    if (!currency || !Helpers.isValidEnumValue(currency, Currencies)) {
        errorList.push({ field: "currency", value: currency, error: "invalid currency" });
    }

    if (!method || !Helpers.isValidEnumValue(method, PaymentMethods)) {
        errorList.push({ field: "method", value: method, error: "invalid payment method" });
    }

    if (errorList.length > 0) {
        return res.status(400).json({ errorList });
    }

    req.paymentData = { amount, currency, method };
    next();
};

module.exports = validatePaymentRequest;