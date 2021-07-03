var {Router} = require('express');
var router = Router();

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

router.get('/editar', function(req, res, next) {
  res.render('editarp', { title: 'Editar Perfil' });
});

router.get('/administrar', function(req,res,next){
  res.render('administrarplatillo',{title: 'Administrar'});
});

router.get('/platillos', function(req,res,next){
  res.render('tablaplatillos',{title: 'Platillos'});
})
router.get('/login', function(req, res, next) {
  res.render('iniciosesion', { title: 'Inicio Sesión'});
});

router.get('/registrarse', function(req, res, next) {
  res.render('registrarse', { title: 'Registrar'});
});

module.exports = router;
