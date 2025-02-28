const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { PaymentStatus, Currencies, PaymentMethods } = require('../../pkg/utils/enums');

const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    paymentGatewayId: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [Object.values(Currencies)]
        }
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [Object.values(PaymentMethods)]
        }
    },
    status: {
        type: DataTypes.ENUM(...Object.values(PaymentStatus)),
        defaultValue: PaymentStatus.PENDING
    }
}, {
    timestamps: true,
    tableName: 'payments'
});

module.exports = Payment;