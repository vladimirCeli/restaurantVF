var { Router } = require("express");
const platillo = require("../models/platillo");
var router = Router();

const {cargarDatosPlatillo,renderAdministrar,administrar, buscarPlatillo} =require('../controllers/platillo.controllers');

router.get("/administrar", renderAdministrar);

router.put("/administrar", cargarDatosPlatillo);

router.delete("/administrar", buscarPlatillo);

//Ingreso de platillos por administrador
router.post("/administrar", administrar);
 
module.exports = router;
