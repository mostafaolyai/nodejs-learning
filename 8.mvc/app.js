// const http= require('http')

const express = require('express')
const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')
const bodyParser = require('body-parser')
const path = require('path');
const errorController = require('./controller/error')

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
app.use('/admin', adminRouter)
app.use(shopRouter)

//#endregion

//404 it can be conreoller
app.use(errorController.get404)
app.listen(3000)