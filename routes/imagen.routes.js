const { Router } = require('express'); 
const router = new Router();
const path = require('path');
const multer = require('multer'); 

////////////////////////////////

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const uploadImage = multer({
    storage,
    limits: {fileSize: 1000000}
}).single('image');

router.post('/upload', (req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'El archivo es muy grande';
            return res.send(err);
        }
        console.log(req.file);
        res.send('Subida exitosa');
    });
});

router.get('/images', (req, res) => {});


module.exports = router;