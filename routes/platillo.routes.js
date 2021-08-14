var { Router } = require("express");
const platillo = require("../models/platillo");
var router = Router();

const {cargarDatosPlatillo,renderAdministrar,renderPlatillo,administrar, buscarPlatillo,actualizarPlatillo} =require('../controllers/platillo.controllers');

router.get("/administrar", renderAdministrar);

router.get('/administrar/edit/:id', renderPlatillo);

router.put("/administrar", cargarDatosPlatillo);

router.delete("/administrar", buscarPlatillo);

//Ingreso de platillos por administrador
router.post("/administrar", administrar);

router.post("/administrar?_method=PUT", administrar);


// router.post("/administrar?_method=PUT", administrar);

router.put('/administrar/edit/:id',actualizarPlatillo);
 
module.exports = router;
