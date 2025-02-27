const PaymentStatus = Object.freeze({
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILURE: 'failure'
});

const Currencies = Object.freeze({
    DOLLAR: 'dollar',
    REAL:   'real',
    PESOS:  'pesos',
    EUROS:  'euros',
    LIBRA:  'libra',
});

const PaymentMethods = Object.freeze({
    CREDIT_CARD:    'credit_card',
    PAYPAL:         'paypal',
    PIX:            'pix',
    BANK_SLIP:      'bank_slip',
});

module.exports = { PaymentStatus, Currencies, PaymentMethods };