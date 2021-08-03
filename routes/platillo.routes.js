var { Router } = require("express");
const platillo = require("../models/platillo");
var router = Router();

const {cargarDatosPlatillo,renderAdministrar,administrar} =require('../controllers/platillo.controllers');

router.get("/administrar", renderAdministrar);

router.put("/administrar", cargarDatosPlatillo)

//Ingreso de platillos por administrador
router.post("/administrar", administrar);
 
module.exports = router;
