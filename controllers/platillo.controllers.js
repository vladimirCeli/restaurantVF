const platillo = require("../models/platillo");

const platilloCtrl = {};

platilloCtrl.renderPlatillos = (req, res) => {
  res.render("tablaplatillos", { title: "Platillos" });
};

platilloCtrl.renderAdministrar = (req, res) => {
  res.render("administrarplatillo", { title: "Administrar" });
};

platilloCtrl.administrar = (req, res) => {
    const platillo_ = new platillo(req.body);
    platillo_.save(function(err) {
      if (!err){ 
        console.log("Platillo agregado con éxito");
        console.log(platillo);
        res.send('Platillo agregado')
      }else {
      console.log("Ha ocurrido un error",err);
        res.send("error")                               
      }
    });
  }

  module.exports = platilloCtrl;