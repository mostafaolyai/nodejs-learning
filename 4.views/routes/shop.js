const express = require('express');
const path = require('path')

const pathDir = require('../util/path')

const router = express.Router();


router.use('/',(req, res, next) => {
    console.log('main page')
    
    res.sendFile(path.join(pathDir, 'views', 'shop.html'))
})

module.exports = router;