const express = require("express");

const router = express.Router();
const adminController = require('../controller/admin')

//it needs to be first that '/' because when you add '/add-product', at first see / and routes to '/'
// /admin/add-product => GET
router.use('/add-product',adminController.getAddProduct)

//we can limit midleware rout by post get ....
// /admin/product => POST
// when we want to don't iterate admin, in app file add /admin to midleware use
router.post('/product',adminController.getProducts)


//when we have one module we use module.exports = router;
//when we want to change name and have more than one
module.exports = router;