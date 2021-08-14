const {
  Router
} = require("express");
const usersCtrl = Router();
const passport = require("passport");
const users = require("../models/users");
const Cart = require("../models/cart");
require("../passport/local-auth")(passport);
const bcrypt = require('bcrypt-nodejs');

usersCtrl.renderRegistrarse = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("index", {
      title: "Bienvenidos a La-Place"
    });
  } else {
    res.render("registrarse", {
      title: "Registrate"
    });
  }
};

usersCtrl.registrarse = () => passport.authenticate("local-signup", {
  successRedirect: "/",
  failureRedirect: "/registrarse",
  failureFlash: true,
});

usersCtrl.renderIngresar = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("index", {
      title: "Login"
    });
  } else {
    res.render("iniciosesion", {
      title: "Accede"
    });
    // next();
  }
};

usersCtrl.ingresar = () => passport.authenticate("local-signin", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

usersCtrl.logout = (req, res, next) => {
  req.session.cart = {};
  req.logout();
  res.redirect("/login");
};

//render to profile
usersCtrl.renderProfile = (req, res) => {
  try {
    res.render('profile', {
      user: req.user,
      title: 'Perfil',
      msgOK: req.flash('msgOK'),
      msg: req.flash('msg')
    });
  } catch (error) {
    res.render("/", {
      error: true,
      // msg: 'Datos no válidos'
    });
    console.log('error', error);
  }
};

//all edit user here
usersCtrl.renderEditar = async (req, res) => {
  try {
    const existUser = await users.findOne({
      _id: req.params.id
    });
    res.render("editarp", {
      user: existUser,
      error: false,
      title: 'Editar',
      msg: req.flash('msg')
    });
  } catch (error) {
    res.render("profile", {
      error: true,
      msg: 'Datos no válidos'
    });
    console.log('error', error);
  }
};

usersCtrl.renderM = (req, res) => {
  res.render('editarp', {
    title: 'nuevo'
  });
};

usersCtrl.renderEditarPut = async (req, res) => {
  const id = req.params.id
  const body = req.body
  try {
    const user = await users.findByIdAndUpdate(id, body, {
      useFindAndModify: false
    })
    res.json({
      estado: true,
      mensaje: 'Editado'
    })
  } catch (error) {
    console.log('error', error);
    res.json({
      estado: false,
      mensaje: 'No se completo la acción!!'
    })
  }
};

usersCtrl.renderEditarPasswordPost = async (req, res) => {
  const body = req.body
  var user = req.user || null;
  var iguales = await bcrypt.compareSync(body.password, user.password);
  console.log(iguales, 'password ok ');
  if (iguales) {
    data = {
      password: bcrypt.hashSync(body.password2, bcrypt.genSaltSync(10))
    };
    const actualizado = await users.findByIdAndUpdate(user._id, data, {
      useFindAndModify: false
    });
    req.flash('msgOK', 'Contraseña actualizada');
    res.redirect('/profile');
    console.log(actualizado, 'datos actualizados');
  } else {
    console.log('datos NO actualizados');
    req.flash('msg', 'Su contraseña actual no es válida');
    res.redirect('/profile');
  }
};

usersCtrl.renderRoles = (req, res) => {
  users.find({}, (error, users) => {
    res.render('asigroles', {
      users,
      title: 'Asignacion de roles',
      sesion: false,
      msg: {
        error: req.flash('error'),
        info: req.flash('info')
      },
    });
  }).sort({
    timestamp: -1
  });
};
usersCtrl.editRoles = async (req, res, next) => {

  let {
    id
  } = req.params;
  const user = await users.findById(id);
  if (user.rol == 1) {
    user.rol = 2;
  } else if (user.rol == 2) {
    user.rol = 1;
  }
  await user.save();
  res.redirect('/roles');
};

//this function verify if user it's loggued
function isLogged(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/');
  }
}

module.exports = usersCtrl;