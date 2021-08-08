const menuCtrl = {};
const Platillo = require("../models/platillo");
const Cart = require("../models/cart");;

menuCtrl.renderMenu = async (req, res) => {
  try {
    const platillosDB = await Platillo.find();
    res.render("menu", {
      title: "Menú",
      platillos: platillosDB
    });
  } catch (error) {
    console.log('error', error);
  }
};

menuCtrl.renderCarrito = (req, res) => {
  if (!req.session.cart) {
    return res.render("carrito", {
      title: 'Carrito',
      platillos: []
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('carrito', {
    title: 'Carrito',
    platillos: cart.generateArray(),
    total: cart.total
  });
};

module.exports = menuCtrl;