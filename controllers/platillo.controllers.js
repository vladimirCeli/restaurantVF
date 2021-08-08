const Platillo = require("../models/platillo");
const { Router } = require("express");
const { path } = require("../app");
const { NotExtended } = require("http-errors");
const platilloCtrl = Router();
const {subirImagen} = require("./imagen.controllers");

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
    id
  });
};

platilloCtrl.buscarPlatillo = async (req, res) => {
  const { buscar } = req.body;
  // String cadena = ;
  let cadena = buscar.substring(1, buscar.length);
  // let cadena = buscar+"";
  // let subcadena = "/.*"+cadena+".*/i";

  const platillos = await Platillo.find({nombre: cadena}).lean();
  // console.log(buscar);
  // console.log("Guata");
  // res.send(`hola buscar(${buscar}), cadena(${cadena}), subcadena(${subcadena}), platillos(${platillos}))`);
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
    img: ""
  });
};

platilloCtrl.administrar = (req, res) => {
  
  const {nombre,descripcion,precio,image}=req.body;
  
  const file = subirImagen(req,res);
  console.log(file);
  res.send(file);
  // new Platillo({
    
    //   nombre: nombre,
    //   descripcion: descripcion,
    //   precio: precio,
    //   url: "/uploads/" + image,
  //   calificacion: 5,
  //   estado: true,
  // }).save(function (err) {
  //   if (!err) {
  //     console.log("Platillo agregado con éxito");
  //     console.log(Platillo);
  //     res.send("Platillo agregado "+image);
  //   } else {
  //     console.log("Ha ocurrido un error ", err);
  //     res.send("error "+image);
  //   }
  // });
};



module.exports = platilloCtrl;
