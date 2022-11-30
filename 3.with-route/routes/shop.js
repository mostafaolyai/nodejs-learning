const express = require('express');

const router = express.Router();


router.use('/',(req, res, next) => {
    console.log('main page')
    res.send('<h1>Main Page</h1>')
})

module.exports = router;