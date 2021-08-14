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
    res.redirect('/administrar');
});

router.post('/uploadEdit', (req, res) => {
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
    //res.redirect('/administrar/edit/:id');
});
 
module.exports = router;