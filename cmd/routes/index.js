const express = require('express');
const paymentsRoutes = require('./payments');
const enumsRoutes = require('./enums');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('welcome to payments-api!');
});

router.use('/payments', paymentsRoutes);
router.use('/enums', enumsRoutes);

module.exports = router;