const express = require('express');
const router = express.Router();

const shopController = require('../controller/shop')

router.use('/', shopController.getProducts)

module.exports = router;