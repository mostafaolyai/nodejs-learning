const express = require('express');
const path = require('path')

const pathDir = require('../util/path')

const router = express.Router();

const adminData = require('./admin')

router.use('/',(req, res, next) => {
    console.log('shop: ', adminData.db)
    
    res.sendFile(path.join(pathDir, 'views', 'shop.html'))
})

module.exports = router;