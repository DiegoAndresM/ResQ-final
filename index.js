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
var usersRouter = require('./routes/index');
var workersRouter = require('./routes/workers');
var mapRouter = require('./routes/index');
var registerRouter = require('./routes/index');
var chartsRouter = require('./routes/index');
var profileRouter = require('./routes/index');
var signinRouter = require('./routes/index');


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
app.use(passport.session());6

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  console.log(app.locals)
  next();
});

// view engine setup
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/workers', workersRouter);
app.use('/map', mapRouter);
app.use('/register', registerRouter);
app.use('/charts', chartsRouter);
app.use('/profile', profileRouter);
app.use('/signin', signinRouter);








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
