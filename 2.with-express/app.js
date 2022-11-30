// const http= require('http')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

//first of all rout
app.use(bodyParser.urlencoded({extended: false}))

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

//#region route
//it needs to be first that '/' because when you add '/add', at first see / and routes to '/'
app.use('/add-product',(req, res, next) => {
    console.log('add product')
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>')
})

//we can limit midleware rout by post get ....
app.post('/product',(req, res, next) => {
    console.log(req.body)
    res.redirect('/')
})

app.use('/',(req, res, next) => {
    console.log('main page')
    res.send('<h1>Main Page</h1>')
})
//#endregion

// const server = http.createServer(app)

app.listen(3000)