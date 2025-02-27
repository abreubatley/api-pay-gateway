const validatePaymentRequest = (req, res, next) => {
    const { amount, currency, method } = req.body;

    //TODO: Validate fields here

    req.paymentData = { amount, currency, method };
    next();
};

module.exports = validatePaymentRequest;