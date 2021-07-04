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
const User = require("../models/users");
router.get("/registrarse", function(req, res, next) { res.render("registrarse", { title: "Registrarce" })}
);
router.post("/registrarse", (req, res) => {
  
const user = new User(req.body);
if(user.name  == ""){
  alert("Ingresa tu nombre");
} else if(user.surname  == ""){ alert("Ingresa tu Apellido")}
else if(user.cedula  == ""){alert("Ingresa tu número de cédula")} else {
user.save(function (err) {

  if (!err){ 
          console.log("Usuario agregado con éxito");
          console.log(User);
          res.send('Usuario agregado')
  }else {
      console.log("Ha ocurrido un error",err);
      res.send("error")                               }
});}
});

router.get("/login", function(req, res, next) { res.render("iniciosesion", { title: "Inicio de Sesion" })}
);
router.post("/login", (req, res) => res.send("login"));

router.get("/logout", (req, res) => res.send("logout"));

module.exports = router;
