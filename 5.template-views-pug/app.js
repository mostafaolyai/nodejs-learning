// const http= require('http')

const express = require('express')
const adminData = require('./routes/admin')
const shopRouter = require('./routes/shop')
const bodyParser = require('body-parser')
const path = require('path');

const app = express()

//set template engin
//official doc https://pugjs.org/api/getting-started.html
app.set('view engine','pug')
app.set('views','views')

// static file
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, '../===when you want to other folder' 'public','FILENAME')))

//first of all rout
app.use(bodyParser.urlencoded({extended: false}))

//#region router
// when we want to don't iterate admin, in app file add /admin to midleware use
app.use('/admin', adminData.routes)
app.use(shopRouter)

//#endregion

//#region middleware
app.use((req, res, next) => {
    console.log('middleware 1')
    next()// if we don't put next it doesn't go to next middleware
})

app.use((req, res, next) => {
    console.log('middleware 2')
     next()// if we don't put next it doesn't go to recieve request
    //OR
    //res.send('<h1>hello from express!</h1>')
})
//#endregion

//404
app.use((req, res, next) => {
    res.status(404).send("<h1>NOT FOUND!</h1>")
})
app.listen(3000)