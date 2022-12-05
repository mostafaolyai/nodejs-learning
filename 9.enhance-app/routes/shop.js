const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products',shopController.getProducts);
router.post('/products',shopController.postProduct);
router.get('/products/:productId',shopController.getProduct);
router.get('/cart', shopController.getCart);
router.get('/checkout',shopController.getCheckout);

module.exports = router;
