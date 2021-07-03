var express = require('express');
var router = express.Router();

const {
  renderSignupForm,
  renderSigninForm,
  signup,
  signin,
  logout,
} = require("../controllers/users.controller");
/* GET users listing. */
router.get("/registrarse", renderSignupForm);
router.post("users/registrarse", signup);

router.get("/iniciosesion", renderSigninForm);
router.post("users/login", signin);

router.get("users/logout", logout);

module.exports = router;
