// const http= require('http')

const express = require('express')
const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')
const bodyParser = require('body-parser')

const app = express()

//first of all rout
app.use(bodyParser.urlencoded({extended: false}))

//#region router
// when we want to don't iterate admin, in app file add /admin to midleware use
app.use('/admin',adminRouter)
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

// const server = http.createServer(app)

app.listen(3000)