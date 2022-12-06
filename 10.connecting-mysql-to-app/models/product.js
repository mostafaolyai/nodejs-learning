const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const db = require('../util/database');


module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    //first title without ""
    // db.execute(`INSERT INTO product (title) VALUES (${this.title})`)
    return db.execute(`INSERT INTO product (title) VALUES (?)`,
    [this.title]
    );
  }

  static deleteById(id) {
    
  }

  static fetchAll() {
      return db.execute('SELECT * FROM product')
    
  }

  static findById(id) {
    return db.execute(`SELECT * FROM product WHERE product.id = ?`, [id]);
  }
};
