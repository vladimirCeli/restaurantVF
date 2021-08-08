const { Router } = require("express");
const router = new Router();
const path = require("path");
const multer = require("multer");

////////////////////////////////
const ImageCtrl = {};

// ImageCtrl.uploadImage = () => {
//   multer({
//     storage,
//     limits: { fileSize: 1000000 },
//   }).single("image");
// };
const uploadImage = multer({
  storage,
  limits: {fileSize: 1000000}
}).single('image');

ImageCtrl.subirImagen = (req, res) => {
  uploadImage(req, res, (err) => {
    if (err) {
      err.message = "El archivo es muy grande";
      // return res.send(err);
      console.log("No se pudo subir la imagen", err.message);
    }
    console.log(req.file);
    return req.file;
    // next();
    // res.send('Subida exitosa');
    console.log("Se subio la imagen exitosamente");
  });
};

module.exports = ImageCtrl;
