const express = require('express');
const router = express.Router();

const {getEnums} = require("../handlers/enums");

router.get('/', getEnums);

module.exports = router;