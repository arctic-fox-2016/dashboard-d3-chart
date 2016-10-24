const data = require('./controllers/data')
const datadate = require('./controllers/datadate')

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index.ejs', {
      title: "CMS Api"
    }); // load the index.ejs file
  });

  app.get('/line', function(req, res) {
    res.render('chart_line.ejs', {
      title: "Chart Line"
    });
  });

  app.get('/pie', function(req, res) {
    res.render('chart_pie.ejs', {
      title: "Chart Pie"
    });
  });

  app.get('/bar', function(req, res) {
    res.render('chart_bar.ejs', {
      title: "Chart Bar"
    });
  });

  app.get('/login', function(req, res) {
    res.render('login_register', {
      title: 'Login',
      type: 1,
      message: req.flash('loginMessage')
    });
  });

  app.get('/register', function(req, res) {
    res.render('login_register', {
      title: 'Register',
      type: 2,
      message: req.flash('loginMessage')
    });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home',
    failureRedirect : '/login',
    failureFlash : true
  }));

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/home',
    failureRedirect : '/register',
    failureFlash : true
  }));

  // =====================================
  // HOME SECTION    =====================
  // =====================================

  app.get('/home', isLoggedIn, function(req, res) {
    res.render('home.ejs', {
      title: 'Home Dashboard',
      user : req.user
    });
  });

  app.get('/data', isLoggedIn, function(req, res) {
    res.render('data.ejs', {
      title: 'Data Dashboard',
      user : req.user
    });
  });

  app.get('/datadate', isLoggedIn, function(req, res) {
    res.render('datadate.ejs', {
      title: 'datadate Dashboard',
      user : req.user
    });
  });

  // =====================================
  // API ==============================
  // =====================================

  app.get('/api/data', data.findAll)
  app.get('/api/data/:id', isLoggedIn, data.findOne)
  app.post('/api/data', isLoggedIn, data.createOne)
  app.put('/api/data/:id', isLoggedIn, data.updateOne)
  app.delete('/api/data/:id', isLoggedIn, data.deleteOne)

  app.get('/api/datadate', datadate.findAll)
  app.get('/api/datadate/:id', isLoggedIn, datadate.findOne)
  app.post('/api/datadate', isLoggedIn, datadate.createOne)
  app.put('/api/datadate/:id', isLoggedIn, datadate.updateOne)
  app.delete('/api/datadate/:id', isLoggedIn, datadate.deleteOne)

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
  return next();
  res.redirect('/');
}
