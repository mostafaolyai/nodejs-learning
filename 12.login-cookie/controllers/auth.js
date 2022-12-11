const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn 
  });
};

exports.postLogin = (req, res, next) => {
    // req.isLoggedIn = true;
    // res.setHeader('Set-Cookie', 'loggedin=true MAX-AGE=10,hhtponly , secure, ')//can see in browser/snippet/application
    
    const email = req.body.email;
    const password = req.body.password
    
    User.findOne({email})
      .then(user => {
        if(!user) res.redirect('/login')
        req.session.isLoggedIn = true;
        req.session.user = user;

        return req.session.save(err => {
          res.redirect('/');
        })
        
      })
      .catch(err => console.log(err))
    
  };

exports.postLogout = (req, res, next) => {
      req.session.destroy((err) => {
        console.log(err)
        res.redirect('/');
      })
  };

  exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuthenticated: req.session.isLoggedIn 
    });
  };
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password

  User.findOne({ email: email })
    .then(userDoc => {
      if(userDoc) return res.redirect('/signup')

      const user = new User({
        email: email,
        password: password,
        cart: { items: [] }
      })
      return user.save()
    })
    .then(user => {
      return res.redirect('/')
    })
    .catch(err => console.log(err))
}