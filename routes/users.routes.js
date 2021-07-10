const { Router } = require("express");
const router = Router();

const {renderRegistrarse,registrarse,renderIngresar,ingresar,logout} = require('../controllers/users.controllers');


router.get("/registrarse", renderRegistrarse);
router.post("/registrarse", registrarse);  

router.get('/login', renderIngresar);

router.post("/login",ingresar);

router.get('/logout', logout);

module.exports = router;