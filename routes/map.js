var express = require('express');
var router = express.Router();

/* GET MAP. */
router.get('/', function(req, res, next) {
  res.render('map');
});

module.exports = router;
