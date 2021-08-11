var { Router } = require("express");
const platillo = require("../models/platillo");
var router = Router();

const {cargarDatosPlatillo,renderAdministrar,administrar, buscarPlatillo} =require('../controllers/platillo.controllers');

router.get("/administrar", renderAdministrar);

router.put("/administrar", cargarDatosPlatillo);

router.delete("/administrar", buscarPlatillo);

//Ingreso de platillos por administrador
router.post("/administrar", administrar);

router.post("/administrar?_method=PUT", administrar);


// router.post("/administrar?_method=PUT", administrar);

router.post("/actualizarPlatillo",async (req, res) => {
    alert("Es el nombre ");
    const {id,nombre,precio,descripcion} = req.body;
    alert(nombre + "Es el nombre ");
    await Platillo.findByIdAndUpdate(id,{nombre,precio,descripcion});
    alert("Se actualizo el platillo seleccionado");
    
});
 
module.exports = router;
