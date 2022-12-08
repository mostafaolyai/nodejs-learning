const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product')
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User)
User.hasMany(Product, { constraints: true, onDelete: 'CASCADE' })
//init and check connection to database
sequelize
  // .sync({ force: true })//everytime ovveride tables
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if(!user) return User.create({ name: 'mosi', email: 'mosi@mosi.io' })
  })
  .then(res => app.listen(3000))
  .catch(err => console.log('db error: ',err))


