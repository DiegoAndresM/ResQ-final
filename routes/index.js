var express = require('express');
var router = express.Router();
const Worker = require('../models/workers'); // Importar el modelo de usuario
const passport = require('passport');
const User = require('../models/user');
const Pulse = require('../models/pulse')


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const workers = await Worker.find(); // Obtener todos los usuarios de la base de datos
    res.render('index', { workers }); // Renderizar la vista 'users' y pasar los usuarios como datos
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

/* GET charts. */
router.get('/charts',isAuthenticated, async function(req, res, next) {
  try {
    const pulses = await Pulse.find(); // Obtener todos los usuarios de la base de datos
    res.render('charts', { pulses }); // Renderizar la vista 'users' y pasar los usuarios como datos
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});
/* GET MAP. */
router.get('/map', isAuthenticated, async function(req, res, next) {
  try {
    const workers = await Worker.find(); // Obtener todos los usuarios de la base de datos
    res.render('map', { workers }); // Renderizar la vista 'users' y pasar los usuarios como datos
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

/* GET REGISTER FUNCTION. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

/* POST REGISTER FUNCTION. */
router.post('/', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  })); 


/* GET SIGNIN PAGE. */
router.get('/signin', (req, res, next) => {
  res.render('signin');
});

/* POST SIGNIN PAGE. */
router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
}));


router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

router.get("/logout", (req, res) => {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/");
  });
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}




module.exports = router;
