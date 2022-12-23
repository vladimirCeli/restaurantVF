const { Router } = require('express'); 
const router = new Router();
const path = require('path');
const multer = require('multer'); 

////////////////////////////////

 /**
  * CArgar imagen con MULTER
  */ 
const uploadImage = multer({
    storage,
    limits: {fileSize: 1000000}
}).single('image');

 /**
  * Subir imagen con MULTER
  */ 
router.post('/upload', (req, res) => {
    console.log(req.file.filename);
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'El archivo es muy grande';
            return res.send(err);
        } else {
            //return res.redirect('/administrar');
        }
        console.log(req.file);
        req.flash('success_msg','Se cargo la foto correctamente')
        
        // res.send('Subida exitosa');
    });
    console.log("post upload  ",req.file.filename);
    req.session.imagen=req.file.filename;
    console.log("post upload",req.session.imagen);
    console.log("Platillo agregado correctamente");
    ////res.redirect('/administrar');
});

router.post('/uploadEdit ', (req, res) => {
    console.log("id metodo imagen : ",req.params.id);
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'El archivo es muy grande';
            return res.send(err);
        }
        console.log(req.file);
        
        // res.send('Subida exitosa');
    });
    console.log("post upload ///////////////////// ",req.file.filename);
    req.session.imagen=req.file.filename;
    console.log("post upload ///////////////////// session ",req.session.imagen);

    res.redirect('/administrar/edit/'+req.params.id);
});
 
module.exports = router;