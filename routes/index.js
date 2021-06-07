var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bienvenido a La Place' });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Menú' });
});

router.get('/editarperfil', function(req, res, next) {
  res.render('editarp', { title: 'Menú' });
});

module.exports = router;
