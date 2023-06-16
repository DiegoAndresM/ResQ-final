var express = require('express');
const router = require('express').Router();

const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  })); 

module.exports = router;
