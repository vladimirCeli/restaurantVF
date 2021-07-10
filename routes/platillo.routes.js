var { Router } = require("express");
const platillo = require("../models/platillo");
var router = Router();

const {renderPlatillos,renderAdministrar,administrar} =require('../controllers/platillo.controllers');

router.get("/platillos", renderPlatillos);

router.get("/administrar", renderAdministrar);

//Ingreso de platillos por administrador
router.post("/administrar", administrar);

module.exports = router;
