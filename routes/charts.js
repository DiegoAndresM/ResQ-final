var express = require('express');
var router = express.Router();

/* GET charts. */
router.get('/', function(req, res, next) {
  res.render('charts');
});

module.exports = router;
