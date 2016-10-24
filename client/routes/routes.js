module.exports = function(app, passport) {

// normal routes ===============================================================
    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('pages/index');
    });
    app.get('/data', function(req, res) {
        res.render('pages/data');
    });

    app.get('/datadate', function(req, res) {
        res.render('pages/data-date');
    });

    app.get('/chart-bar', function(req, res) {
        res.render('pages/chart_bar');
    });

    app.get('/chart-line', function(req, res) {
        res.render('pages/chart_line');
    });


    app.get('/chart-pie', function(req, res) {
        res.render('pages/chart_pie');
    });
    var ar = []
    var getFB = function(token,callback){
      var req = require('request');
      req("https://graph.facebook.com/search?q=nba&type=page&limit=5&access_token="+token, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var hasil = (JSON.parse(body))
          callback(hasil)
        }
      })
    }

    var olahFB = function(token,hasil,callback){
      var req = require('request');
        req("https://graph.facebook.com/"+hasil+"?fields=fan_count,link,name,picture&access_token="+token, function (error, response, body) {
          var hasil2 = (JSON.parse(body))
          ar.push(hasil2)
        })
    }

    // PROFILE SECTION =========================
    app.get('/home', isLoggedIn, function(request, result) {
      var https    = require('https')
      var rp = require('request-promise');
      var token = request.user.facebook.token

      // getFB(token,function(hasil){
      //   for(var i in hasil.data){
      //       olahFB(token,hasil.data[i].id,function(ar){})
      //   }
      //     //console.log(ar)
      //     result.send(ar);
      //   })


         result.render('pages/home.ejs', {
             user : request.user
         });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('pages/login', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/register', function(req, res) {
            res.render('pages/register', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/register', passport.authenticate('local-signup', {
            successRedirect : '/login', // redirect to the secure profile section
            failureRedirect : '/register', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}



//note

      // var req = https.request({
      //   host: 'graph.facebook.com',
      //   path: '/search?q='+"NBA"+'&type=page&limit=1000&access_token='+request.user.facebook.token,
      //   method: 'GET'
      // }, function(res) {
      //   res.setEncoding('utf8');
      //   res.on('data', function(chunk) {
      //     //console.log('got chunk '+chunk);
      //     console.log(chunk);
      //     result.render('profile.ejs', {
      //         user : request.user,
      //         chunk : chunk
      //     });
      //
      //   });
      //   res.on('end', function() {
      //     console.log('response end with status '+res.status);
      //   });
      // });
      // req.end();
      // console.log('sent');

      //console.log(req.user.facebook.token);
      //https://graph.facebook.com/search?q=nba&type=page&limit=1000&access_token=EAACEdEose0cBAPZA5CRIjKTejrOXs0WvvIfPLSC53zyIiH4mMhZCECgasEJgZAyGPV0Ncniv9hX0FDLsMsw1ObTIg2NFzCMATYV3FP3nWAjhlc8B0VO3eOtVTTyUNYhrNRDidlnkl2GODhvQZBZBKmWYQ3quCQn6PBd4gzlfVhQZDZD
