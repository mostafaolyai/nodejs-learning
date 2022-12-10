const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// if there was this usewi will have access whole req
app.use((req, res, next) => {
  User.findByPk(1)
  .then(user => {
    req.user = user;
    next()
  })
  .catch(err => console.log('midleware user check error: ',err))
})


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
//through keep telling sequelize where these connection should be stored and that is my cart item model
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })


//init and check connection to database
sequelize
  //.sync({ force: true })//everytime ovveride tables
   .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if(!user) return User.create({ name: 'mosi', email: 'mosi@mosi.io' })
  })
  // .then(user => {
  //   return user.createCart()
  // })
  .then(cart => app.listen(3000))
  .catch(err => console.log('db error: ',err))


