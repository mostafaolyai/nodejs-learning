const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const errorController = require('./controllers/error');
const User = require('./models/user');

const csrf = require('csurf');

const app = express();
const MONGO_URL = 'mongodb://localhost:27017/nodejs-learning'
const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: 'session'
})
const csrfProtection = csrf()
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
/**
this means that the session will not be saved on every request \
that is done, so on every response that is sent
but only if something changed in the session.,
this will obviously improve performance and so on.
Also there is the save uninitialized value 
which you should set to false because this will also basically
ensure that no session gets saved for a request where 
it doesn't need to be saved because nothing was changed about it
 */
app.use(session({ secret:'secret', resave:false, saveUninitialized:false, store: store }))

app.use(csrfProtection)
app.use((req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next()
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGO_URL
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
