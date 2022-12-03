
const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', {prods: products, title: 'Shop',hasProduct: products > 0})
    })
    
}