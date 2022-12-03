/**
const products = [];
module.exports = class Product{
    constructor(t){
        this.title = t
    }

    save(){
        products.push(this)
    }

    static fetchAll(){
        return products
    }
} 
*/


const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(require.main.filename),
        'data',
        'products.json'
);
const getDataFromFile = cb => {

        fs.readFile(p, (err, file) => {

            if(!err)  cb(JSON.parse(file))
             else cb([])
        })
    }
    
module.exports = class Product{
    constructor(t){
        this.title = t
    }

    
    save(){
        getDataFromFile(products =>{
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err)
            })
        })
    }

    static fetchAll(cb){//cb is callback
       getDataFromFile(cb)
    }
}