var express = require('express')
var path = require('path')
var ejs = require('ejs')
var app = express()
var port = process.env.PORT || 9000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var cors = require('cors');

app.use(cors())
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'ivankerenbanget' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// view engine setup

app.use('/api', require('./routes/api'))


app.listen(port);
console.log('The magic happens on port ' + port);
