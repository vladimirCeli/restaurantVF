var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bienvenido a La Place' });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Menú' });
});

router.get('/carrito', function(req, res, next) {
  res.render('carrito', { title: 'Carrito' });
});

router.get('/administrar', function(req,res,next){
  res.render('administrarplatillo',{title: 'Administrar'});
})

module.exports = router;
