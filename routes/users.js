var express = require('express');
var routerx = express.Router();

const {renderSignupForm,renderSigninForm,signup,signin,logout} = require('../controllers/users.controller');
/* GET users listing. */
routerx.get('/registrarse', renderSignupForm);
routerx.post('/registrarse', signup);

routerx.get('/login', renderSigninForm);
routerx.post('/login', signin);

routerx.get('/',logout);

module.exports = routerx;
