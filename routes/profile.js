var express = require('express');
const user = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('profile', { 'user': user });
});

module.exports = router;
