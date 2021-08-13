const menuCtrl = {};
const Platillo = require("../models/platillo");
const Cart = require("../models/cart");
const User = require("../models/users");

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
  var user = req.user || null;
  console.log(user.carrito[0], 'CARRITO TO RENDER');
  res.render('carrito', {
    title: 'Carrito',
    platillos: generateArray(user.carrito[0].items),
    total: user.carrito[0].total
  });


  // if (!req.session.cart) {
  //   return res.render("carrito", {
  //     title: 'Carrito',
  //     platillos: []
  //   });
  // }
  // var cart = new Cart(req.session.cart);
  // res.render('carrito', {
  //   title: 'Carrito',
  //   platillos: cart.generateArray(),
  //   total: cart.total
  // });
};

generateArray = function (cart) {
  var arr = [];
  for (const p in cart) {
    arr.push(cart[p]);
  }
  return arr;
}

module.exports = menuCtrl;