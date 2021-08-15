const {
  Router
} = require("express");
const router = Router();
const passport = require("passport");
require("../passport/local-auth")(passport);

const {
  renderRegistrarse,
  registrarse,
  renderIngresar,
  ingresar,
  renderProfile,
  logout,
  renderEditar,
  renderRoles,
  editRoles,
  renderEditarPut,
  renderM,
  renderEditarPasswordPost, 
  renderVerPago,
  buscarUsuario
} = require('../controllers/users.controllers');

router.get("/editar/:id", renderEditar);
router.put("/editar/:id", renderEditarPut);
router.post("/editarc", passport.authenticate("local-change-pass", {
  successRedirect: "/profile",
  failureRedirect: "/",
  failureFlash: true,
}));

router.post("/editarpass", renderEditarPasswordPost);
router.get("/profile", renderProfile);
router.get("/roles", renderRoles);
router.get("/guardarol/:id", editRoles);

router.get("/modify", renderM);

router.get("/registrarse", renderRegistrarse);
//router.post("/registrarse", registrarse);
router.post("/registrarse", passport.authenticate("local-signup", {
  successRedirect: "/",
  failureRedirect: "/registrarse",
  failureFlash: true,
}));

router.get('/login', renderIngresar);
//router.post("/login",ingresar);
router.post("/login", passport.authenticate("local-signin", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
}));


router.get("/verpagos", renderVerPago);
router.delete("/roles", buscarUsuario);

router.get('/logout', logout);

module.exports = router;