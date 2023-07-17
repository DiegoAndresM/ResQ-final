var express = require('express');
const user = require('../models/user');
var router = express.Router();

/* GET PROFILE PAGE. */
router.get('/', function(req, res, next) {
  res.render('profile', { 'user': user });
});

module.exports = router;
