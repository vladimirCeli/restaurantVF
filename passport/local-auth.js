const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const User = require('../models/users.js');
module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  /**
    * Registro con el metodo local con passport
    */
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    password2Field: 'password2',
    nameField: 'name',
    surnameField: 'surname',
    cedulaField: 'cedula',
    dirField: 'dir',
    phoneField: 'phone',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const user = await User.findOne({
      'email': email
    })

    if (user) { //SI hay un usuario registrado
      return done(null, false, req.flash('signupMessage', 'El correo ya está resgistrado.'));
    }
    //contraseñas no coinciden
    if (req.body.password != req.body.password2) {
      return done(null, false, req.flash('signupMessage', 'Las contraseñas no coinciden'));
    }
    //Contraseña mayor a 5 caracteres
    if (req.body.password.length < 5) {
      return done(null, false, req.flash('signupMessage', 'Las contraseña debe ser mayor a 5 caracteres'));
    }
    //verificar cédula valida
    var cad = req.body.cedula;
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
      for (i = 0; i < longcheck; i++) {
        if (i % 2 === 0) {
          var aux = cad.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
        }
      }

      total = total % 10 ? 10 - total % 10 : 0;

      if (cad.charAt(longitud - 1) != total) {
        return done(null, false, req.flash('signupMessage', 'ingresa una cédula valida'));
      }
    }
    if (req.body.phone.length < 10) {
      return done(null, false, req.flash('signupMessage', 'ingresa una número de celular válido'));
    } else {
      const newUser = new User();
      newUser.name = req.body.name;
      newUser.surname = req.body.surname;
      newUser.email = req.body.email;
      newUser.phone = req.body.phone;
      newUser.dir = req.body.dir;
      newUser.cedula = req.body.cedula;
      newUser.rol = 1;
      newUser.password = newUser.encryptPassword(password);
      console.log(newUser)
      await newUser.save();
      done(null, newUser);
    }
  }));

  /**
  * Login con el metodo local con passport
  */
  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const user = await User.findOne({
      email: email
    });
    if (!user) {
      return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
    }
    if (!user.comparePassword(password)) {
      return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }
    return done(null, user);
  }));

  /**
  * cambiar contraseña con el metodo local con passport
  */
  passport.use('local-change-pass', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    console.log(email, 'EMAIL CHANGE');
    const user = await User.findOne({
      email: email
    });
    if (!user) {
      return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
    } else {
      var newUser = new User();
      newUser.password = newUser.encryptPassword(password);
      console.log(newUser)
      data = {
        password: newUser.encryptPassword(password)
      };
      await User.findByIdAndUpdate(user._id, data, {
        useFindAndModify: false
      })
      done(null, newUser);
    }
  }));
};