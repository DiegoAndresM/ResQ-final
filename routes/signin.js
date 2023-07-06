var express = require('express');
const router = require('express').Router();

const passport = require('passport');

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.render('signin');
});


router.post('/', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
}));

module.exports = router;