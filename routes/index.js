var {
  Router
} = require("express");
const Cart = require("../models/cart");
const User = require("../models/users");
const Platillo = require("../models/platillo");
var router = Router();

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Bienvenido a La Place"
  });
});

router.get('/add-to-cart/:id', function (req, res) {
  var pId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  console.log(req.session.cart, 'req.session.cart');
  Platillo.findById(pId, function (err, platillo) {
    if (err) {
      return res.redirect('/menu');
    }
    cart.add(platillo, platillo.id);
    req.session.cart = cart;
    var user = req.user || null;
    console.log(user, 'sesion de usuario');
    var body = {
      carrito: cart
    }
    editUser(user, body);
    res.redirect('/carrito');
  });
});

async function editUser(user, body) {
  console.log(user, body, 'user y body');
  try {
    const usuarioActualizado = await User.findByIdAndUpdate(user._id, body, {
      useFindAndModify: false
    })
    console.log(usuarioActualizado, 'SE ACTUALIZO EL CARRITO');

  } catch (error) {
    console.log('error', error);
  }
};


router.get('/delete-to-cart/:id', function (req, res, next) {
  var prodId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.decrease(prodId);
  req.session.cart = cart;
  var user = req.user || null;
  console.log(user, 'sesion de usuario');
  var body = {
    carrito: cart
  }
  editUser(user, body);
  res.redirect('/carrito');
});

router.get('/delete-all-cart/:id', function (req, res, next) {
  var prodId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.delete(prodId);
  req.session.cart = cart;
  var user = req.user || null;
  console.log(user, 'sesion de usuario');
  var body = {
    carrito: cart
  }
  editUser(user, body);
  res.redirect('/carrito');
});

generateArray = function (cart) {
  console.log(cart, 'cart en fuction');
  var arr = [];
  for (const p in cart) {
    arr.push(cart[p]);
  }
  console.log(arr, 'array cart');
  return arr;
}

module.exports = router;