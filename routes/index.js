var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bienvenido a Bitaurant' });
});

router.get('/tst', function(req, res, next) {
  res.render('tst', { title: 'Express' });
});

module.exports = router;
