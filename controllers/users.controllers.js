const { Router } = require("express");
const usersCtrl = Router(); 
const passport = require("passport");
const users = require("../models/users");
require("../passport/local-auth")(passport);

usersCtrl.renderRegistrarse = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("index", { title: "Bienvenidos a La-Place" });
  } else {
    res.render("registrarse", { title: "Registrate" });
  }
};

usersCtrl.registrarse = () => passport.authenticate("local-signup", {
  successRedirect: "/",
  failureRedirect: "/registrarse",
  failureFlash: true,
});

usersCtrl.renderIngresar = (req, res,next) => {
  if (req.isAuthenticated()) {
    res.render("index", { title: "Login" });
  } else {
    res.render("iniciosesion", { title: "Accede" });
    // next();
  }
};

usersCtrl.ingresar = () => passport.authenticate("local-signin", {
  successRedirect: "/",
  failureRedirect: "/iniciosesion",
  failureFlash: true,
});

usersCtrl.logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

usersCtrl.renderEditar = (req, res) => {
  res.render("editarp", { title: "Editar Perfil" });
};
usersCtrl.renderRoles = (req, res) => {
  users.find({}, (error, users) => { 
    res.render('asigroles', { users, title: 'Asignacion de roles', 
    sesion: false,
    msg: {error: req.flash('error'), info: req.flash('info')},
    });
  }).sort({ timestamp: -1 });
};
usersCtrl.editRoles = async (req, res, next) => {
   
  let { id } = req.params;
  const user = await users.findById(id);
  if(user.rol==1){
    user.rol=2;
  }else if(user.rol==2){
    user.rol=1;
  }
  await user.save(); 
  res.redirect('/roles');
};
 
module.exports = usersCtrl;
