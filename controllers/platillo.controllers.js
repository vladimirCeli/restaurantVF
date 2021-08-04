const Platillo = require("../models/platillo");
const { Router } = require("express");
const { path } = require("../app");
const { NotExtended } = require("http-errors");
const platilloCtrl = Router();

platilloCtrl.cargarDatosPlatillo = async (req, res) => {
  const platillos = await Platillo.find().lean();
  const { id, nombre, precio, descripcion } = req.body;
  res.render("administrarplatillo", {
    title: "Administrar",
    platillos,    
    id:id,
    nombre: nombre,
    precio: precio,
    descripcion: descripcion,
    buscar: "",
  });
};

platilloCtrl.buscarPlatillo = async (req, res) => {
  const { buscar } = req.body;
  // String cadena = ;
  let cadena = buscar.substring(1, buscar.length);

  const platillos = await Platillo.find({nombre: cadena}).lean();
  // console.log(buscar);
  // console.log("Guata");
  // res.send("GUATA\n"+buscar+platillos);
  res.render("administrarplatillo", {
    title: "Administrar",
    platillos,

    nombre: "",
    precio: "",
    descripcion: "",
    buscar,
  });
};

platilloCtrl.renderAdministrar = async (req, res) => {
  const platillos = await Platillo.find().lean();
  res.render("administrarplatillo", {
    title: "Administrar",
    platillos,
    nombre: "",
    precio: "",
    descripcion: "",
    buscar: "",
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
