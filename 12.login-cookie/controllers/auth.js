exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
    // req.isLoggedIn = true;
    // res.setHeader('Set-Cookie', 'loggedin=true MAX-AGE=10,hhtponly , secure, ')//can see in browser/snippet/application
    req.session.isLoggedIn = true;
    res.redirect('/');
  };
