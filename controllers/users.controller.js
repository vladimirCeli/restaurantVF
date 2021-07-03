import User from "../models/User";
export const redenderSignUpForm = (req, res) => res.render("registrarse");

export const signup = (req, res) => {
  res.send("signup");
//   console.log(req.body);
//   res.send("recived");
  //  const errors = []
  //  const {names,surnames,cedula,dir,email,phone,password} = req.body
  //  if(names.length < 4){
  //      errors.push({text: "Los nombres deben llevar más de 4 caracteres"})
  //  }
  //  if(errors.length<=0)
  //      res.render('registrarse',{
  //          errors
  //      })
  //  else
  // res.send('envio exitoso')
};


export const renderSigninForm = (req, res) => res.render("iniciosesion");
export const signin = (req, res) => res.send("login");
export const logout = (req, res) => res.send("logout");


