const { PaymentStatus, Currencies, PaymentMethods } = require('../../pkg/utils/enums');
const { listEnumValues } = require('../../pkg/utils/helpers');

exports.getEnums = (req, res) => {
    res.json({
        paymentStatus: listEnumValues(PaymentStatus),
        currencies: listEnumValues(Currencies),
        paymentMethods: listEnumValues(PaymentMethods)
    });
};