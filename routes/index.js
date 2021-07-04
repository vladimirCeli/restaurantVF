var { Router } = require("express");
var router = Router();

// const {
//   renderSignupForm,
//   renderSigninForm,
//   signup,
//   signin,
//   logout,
// } = require("../controllers/users.controller");

/* GET home page. */



router.get("/", function (req, res, next) {
  res.render("index", { title: "Bienvenido a La Place" });
});

router.get("/menu", function (req, res, next) {
  res.render("menu", { title: "Menú" });
});

router.get("/carrito", function (req, res, next) {
  res.render("carrito", { title: "Carrito" });
});

router.get("/editar", function (req, res, next) {
  res.render("editarp", { title: "Editar Perfil" });
});

router.get("/administrar", function (req, res, next) {
  res.render("administrarplatillo", { title: "Administrar" });
});

router.get("/platillos", function (req, res, next) {
  res.render("tablaplatillos", { title: "Platillos" });
});






// User 
const passport= require('passport');
const User = require("../models/users");
require('../passport/local-auth')(passport);


router.get("/registrarse", function(req, res, next) { 
  if(req.isAuthenticated()) {
    res.render('index',{title:'Bienvenidos a La-Place'});
   }else{
    res.render('registrarse', {title:'Registrate'});
  }
});
router.post("/registrarse", passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/registrarse',
  failureFlash: true
}));  

router.get('/login', (req, res, next) => {
  if(req.isAuthenticated()) {
   res.render('index',{title:'Login'});
  }else{
 res.render('iniciosesion',{title:'Accede '});
  }
});

router.post("/login",passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/iniciosesion',
  failureFlash: true
}));


router.get("/logout", (req, res) => res.send("logout"));

module.exports = router;
