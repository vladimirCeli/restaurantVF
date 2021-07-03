var express = require('express');
var router = express.Router();

const {renderSignupForm,renderSigninForm,signup,signin,logout} = require('../controllers/users.controller');
/* GET users listing. */
router.get('/registrarse', renderSignupForm);
router.post('/registrarse', signup);

router.get('/login', renderSigninForm);
router.post('/login', signin);

router.get('/',logout);

module.exports = router;
