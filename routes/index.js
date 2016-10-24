// app/routes.js
module.exports = function(app, passport) {

    const letterController = require('../controllers/letter')
    const dateController = require('../controllers/dates')
    const dataController = require('../controllers/data')

    app.get('/api/data', dataController.display)
    app.get('/api/datadate', dataController.display2)

    app.get('/API/searchdate/:key', dateController.search)
    app.get('/API/searchdate2/:key', dateController.search2)
    app.post('/API/dates', dateController.insert)
    app.get('/API/dates', dateController.displayAll)
    app.put('/API/dates/:id', dateController.update)
    app.delete('/API/dates/:id', dateController.deleteOne)
    app.get('/API/dates/:id', dateController.detail)
    app.delete('/API/dates/', dateController.deleteAll)

    app.get('/API/searchletter/:key', letterController.search)
    app.get('/API/searchletter2/:key', letterController.search2)
    app.post('/API/letter', letterController.insert)
    app.get('/API/letter', letterController.displayAll)
    app.put('/API/letter/:id', letterController.update)
    app.delete('/API/letter/:id', letterController.deleteOne)
    app.get('/API/letter/:id', letterController.detail)
    app.delete('/API/letter/', letterController.deleteAll)

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/pie', function(req, res) {
        res.render('pie.ejs');
    });
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });
    app.get('/bar', function(req, res) {
        res.render('bar.ejs');
    });
    app.get('/line', function(req, res) {
        res.render('line.ejs');
    });



    app.get('/home', isLoggedIn, function(req, res) {
        res.render('home.ejs', {
            email:req.user.local.email,
            user: req.user
        });
    });
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // DATA
    app.get('/data', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('data.ejs');
    });

    app.get('/dates', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('dates.ejs');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
