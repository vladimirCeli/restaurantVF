var { Router } = require("express");
const platillo = require("../models/platillo");
var router = Router();
const notesCtrl = {};

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

router.get("/registrarse", function(req, res, next) { res.render("registrarse", { title: "Registrarce" })}
);
router.post("/registrarse", (req, res) => {
  console.log(req.body);
  res.send("recived");
});

router.get("/login", function(req, res, next) { res.render("iniciosesion", { title: "Inicio de Sesion" })}
);
router.post("/login", (req, res) => res.send("login"));

router.get("/logout", (req, res) => res.send("logout"));

//Ingreso de platillos por administrador

router.post("/administrar", async(req, res) => {
  const {nombre,descripcion,calificacion,precio} = req.body;
  const newplatillo = new platillo({nombre:nombre,descripcion:descripcion,calificacion:calificacion,precio:precio});
  console.log(req.body)
  //guardar en base de datos
  await newplatillo.save();
  //res.send('new platillo')
});



module.exports = router;
