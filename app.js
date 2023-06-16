var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const MongoStore = require('connect-mongo');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var workersRouter = require('./routes/workers');
var mapRouter = require('./routes/map');
var registerRouter = require('./routes/register');

var app = express();
require('./server');
require('./passport/local-auth');




app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(require('express-session')({ 
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/ResQ' }),
  secret: 'keyboard cat', 
  resave: true, 
  saveUninitialized: true }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/workers', workersRouter);
app.use('/map', mapRouter);
app.use('/register', registerRouter);

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  console.log(app.locals)
  next();
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
