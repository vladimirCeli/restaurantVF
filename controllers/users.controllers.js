const usersCtrl = {};
const passport = require("passport");
require("../passport/local-auth")(passport);

usersCtrl.renderRegistrarse = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("index", { title: "Bienvenidos a La-Place" });
  } else {
    res.render("registrarse", { title: "Registrate" });
  }
};

usersCtrl.registrarse = passport.authenticate("local-signup", {
  successRedirect: "/",
  failureRedirect: "/registrarse",
  failureFlash: true,
});

usersCtrl.renderIngresar = (req, res, next) => {
  if (req.isregistrarsed()) {
    res.render("index", { title: "Login" });
  } else {
    res.render("iniciosesion", { title: "Accede " });
  }
};

usersCtrl.ingresar = passport.registrarse("local-signin", {
  successRedirect: "/",
  failureRedirect: "/iniciosesion",
  failureFlash: true,
});

usersCtrl.logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

module.exports = usersCtrl;
