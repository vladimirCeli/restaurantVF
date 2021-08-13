const Platillo = require("../models/platillo");
const { Router } = require("express");
const { path } = require("../app");
const { NotExtended } = require("http-errors");
const flash = require('connect-flash');
const platilloCtrl = Router();
const mongoose = require('mongoose');

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
    console.log("render adminnistrar =============",req.session.imagen,"la imagen es indefinida?:",(req.session.imagen===undefined));
  
  res.render("administrarplatillo", {
    title: "Administrar",
    platillos,
    nombre: "",
    precio: "",
    descripcion: "",
    buscar: "",
    imagenCap: req.session.imagen,
  });
};
platilloCtrl.renderPlatillo = async (req, res) => {
  //res.send("editar");
  //let {
  //  id
  //} = req.params;
  console.log("id : "+  req.params.id)
  try {
    
    const platillo = await Platillo.findById(req.params.id);
  
    
    res.render('editPlatillo', {platillo,
      title: "Editar platillo"
    });
    
  } catch (error) {
    res.send("error");
    console.log('error', error);
  }
  //res.send("/administrar/editPlatillo");
  //res.render("administrarplatillo", {
    //title: "Administrar",
    //platillos,
    //nombre: "",
    //precio: "",
    //descripcion: "",
    //buscar: "",
    //imagenCap: req.session.imagen,
//});
};

platilloCtrl.administrar = async(req, res) => {
  
  if(req.body.id == ""){
    new Platillo({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      url: "/uploads/"+ req.body.nombre+".jpg",
      calificacion: 5,
      estado: true,
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
  }else{
    const {id,nombre,precio,descripcion} = req.body;
    alert(nombre + "Es el nombre ");
    await Platillo.findByIdAndUpdate(req.body.id,{nombre,precio,descripcion});
    alert("Se actualizo el platillo seleccionado");
    res.send("Actualizado");
  }
  
};

platilloCtrl.actualizarPlatillo = async(req, res) => {
    console.log("id : "+  req.params.id)  
    const {nombre, precio, descripcion } = req.body;
    await Platillo.findByIdAndUpdate(req.params.id,{nombre, precio, descripcion})
    res.render("administrarplatillo", {
      title: "Administrar",
      platillos,
      nombre: "",
      precio: "",
      descripcion: "",
      buscar: "",
      imagenCap: req.session.imagen,
    });
  
};


module.exports = platilloCtrl;
