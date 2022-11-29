const http= require('http')

const express = require('express')

const app = express()

//middleware
app.use((req, res, next) => {
    console.log('middleware 1')
    next()// if we don't put next it doesn't go to next middleware
})

app.use((req, res, next) => {
    console.log('middleware 2')
    next()// if we don't put next it doesn't go to recieve request
})

//end

const server = http.createServer(app)

server.listen(3000)