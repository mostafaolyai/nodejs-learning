const express = require("express");
const path = require('path')

const pathDir = require('../util/path')

const router = express.Router();

//db
const products=[]

//it needs to be first that '/' because when you add '/add-product', at first see / and routes to '/'
// /admin/add-product => GET
router.use('/add-product',(req, res, next) => {
    console.log('add product')

    products.push({title: req.body.title})
    res.sendFile(path.join(pathDir, 'views', 'add-product.html'))
})

//we can limit midleware rout by post get ....
// /admin/product => POST
// when we want to don't iterate admin, in app file add /admin to midleware use
router.post('/product',(req, res, next) => {
    // console.log(req.body)
    res.redirect('/')
})


//when we have one module we use module.exports = router;
//when we want to change name and have more than one
exports.routes = router;
exports.db = products;