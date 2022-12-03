const path = require('path')
const pathDir = require('../util/path')
const Product = require('../models/product')


exports.getAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save();

    res.sendFile(path.join(pathDir, 'views', 'add-product.html'))
}

exports.getProducts = (req, res, next) => {
    res.redirect('/')
}
