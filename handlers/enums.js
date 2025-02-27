const { PaymentStatus, Currencies, PaymentMethods } = require('../utils/enums');
const { listEnumValues } = require('../utils/helpers');

exports.getEnums = (req, res) => {
    res.json({
        paymentStatus: listEnumValues(PaymentStatus),
        currencies: listEnumValues(Currencies),
        paymentMethods: listEnumValues(PaymentMethods)
    });
};