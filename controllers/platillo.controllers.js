const Platillo = require("../models/platillo");
const { Router } = require("express");
const { path } = require("../app");
const { NotExtended } = require("http-errors");
// const { log } = require("debug");
// const flash = require('connect-flash');
const platilloCtrl = Router();

/**
  * Función listar platillos
  */ 
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

/**
  * Función buscar platillo
  */ 
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

/**
  * renderizado administrar platillo 
  */ 
platilloCtrl.renderAdministrar = async (req, res) => {
  const platillos = await Platillo.find().lean();
  console.log("render adminnistrar =============",req.session.imagen,"la imagen es indefinida?:",(req.session.imagen===undefined));
  res.render("administrarplatillo", {
    title: "Administrar",
    platillos,
    nombre: "",
    precio: "",
    descripcion: "",
    buscar: "",
    imagenCap: req.session.imagen,
    error_msg: req.session.error_msg,
  });
};

platilloCtrl.administrar = async (req, res) => {

  const {nombre,descripcion,precio}=req.body;
  const existeNombre = await Platillo.findOne({nombre});
  if (existeNombre) {
    console.log("ya existe un platillo con el mismo nombre");
    req.session.error_msg="ya existe un platillo con el mismo nombre";
    req.flash("error_msg","El platillo ya existe");
    res.redirect("/administrar");
  } else {
    new Platillo({
    
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      url: "/uploads/" + req.session.imagen,
      calificacion: 5,
      estado: true,
    }).save(function (err) {
      //destruyendo session
      req.session.destroy();
      if (!err) {
        console.log("Platillo agregado con éxito");
        console.log(Platillo);
        // res.send("Platillo agregado ");
        res.redirect("/administrar");
      } else {
        console.log("Ha ocurrido un error ", err);
        res.redirect("/administrar");
      }
    });
  }
};



module.exports = platilloCtrl;
