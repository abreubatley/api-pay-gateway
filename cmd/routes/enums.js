const express = require('express');
const router = express.Router();

const {getEnums} = require("../../internal/handlers/enums");

router.get('/', getEnums);

module.exports = router;