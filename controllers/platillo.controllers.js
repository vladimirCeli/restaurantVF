const Platillo = require("../models/platillo");
const { Router } = require("express");
const { path } = require("../app");
const platilloCtrl = Router();

platilloCtrl.cargarDatosPlatillo = async (req,res) =>{
  const platillos = await Platillo.find().lean();
  const {id,nombre,precio,descripcion} = req.body;
  res.render("administrarplatillo", {
    title: "Administrar",
    platillos,
    nombre: nombre,
    precio: precio,
    descripcion: descripcion,
  });
};

platilloCtrl.buscarPlatillo = async (req,res)=>{
  
}

platilloCtrl.renderAdministrar = async (req, res) => {
  const platillos = await Platillo.find().lean();
  res.render("administrarplatillo", {
    title: "Administrar",
    platillos,
    nombre: "",
    precio:"",
    descripcion: "",
  });
};

platilloCtrl.administrar = (req, res) => {
  new Platillo({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    url: "/uploads/" + req.body.image,
    calificacion: 5,
  }).save(function (err) {
    if (!err) {
      console.log("Platillo agregado con éxito");
      console.log(Platillo);
      res.send("Platillo agregado");
    } else {
      console.log("Ha ocurrido un error", err);
      res.send("error");
    }
  });
};

module.exports = platilloCtrl;
