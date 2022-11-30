const express = require('express');
const path = require('path')

const router = express.Router();


router.use('/',(req, res, next) => {
    console.log('main page')
    
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))
})

module.exports = router;