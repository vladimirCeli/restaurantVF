var {
  Router
} = require("express");
const Cart = require("../models/cart");
const Platillo = require("../models/platillo");
var router = Router();
 
/**
  * Renderizado vista principal
  */ 
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Bienvenido a La Place"
  });
});

/**
  * Añadir al carrito 
  */ 
router.get('/add-to-cart/:id', function (req, res) {
  var pId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Platillo.findById(pId, function (err, platillo) {
    if (err) {
      return res.redirect('/menu');
    }
    cart.add(platillo, platillo.id);
    req.session.cart = cart;
    console.log(req.session.cart, 'CART OK');
    res.redirect('/carrito');
  });
});

/**
  * Borrar del carrito 
  */ 
router.get('/delete-to-cart/:id', function (req, res, next) {
  var prodId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.decrease(prodId);
  req.session.cart = cart;
  res.redirect('/carrito');
});


/**
  * Borrar sesión de carrito 
  */ 
router.get('/delete-all-cart/:id', function (req, res, next) {
  var prodId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.delete(prodId);
  req.session.cart = cart;
  res.redirect('/carrito');
});


module.exports = router;