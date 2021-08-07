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
  renderM
} = require('../controllers/users.controllers');

router.get("/editar/:id", renderEditar);
router.put("/editar/:id", renderEditarPut);
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
  failureRedirect: "/iniciosesion",
  failureFlash: true,
}));



router.get('/logout', logout);

module.exports = router;