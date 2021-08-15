var {
  Router
} = require("express");
const Cart = require("../models/cart");
const User = require("../models/users");
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
  var user = req.user || null;
  console.log("++++++++++ Usuario:"+user)
  var cart = new Cart(user.carrito[0] || {} );
  console.log(cart, 'req.session.cart');
  Platillo.findById(pId, function (err, platillo) {
    if (err) {
      return res.redirect('/menu');
    }
    cart.add(platillo, platillo.id);
    req.session.cart = cart;
    var body = {
      carrito: cart
    }
    editUser(user, body);
    res.redirect('/menu');
  });
});

async function editUser(user, body) {
  try {
    const usuarioActualizado = await User.findByIdAndUpdate(user._id, body, {
      useFindAndModify: false
    })
  } catch (error) {
    console.log('error', error);
  }
};

/**
  * Borrar del carrito 
  */ 
router.get('/delete-to-cart/:id', function (req, res, next) {
  var prodId = req.params.id;
  var user = req.user || null;
  var cart = new Cart(user.carrito[0]);
  cart.decrease(prodId);
  req.session.cart = cart;
  var body = {
    carrito: cart
  }
  editUser(user, body);
  res.redirect('/carrito');
});


/**
  * Borrar sesión de carrito 
  */ 
router.get('/delete-all-cart/:id', function (req, res, next) {
  var prodId = req.params.id;
  var user = req.user || null;
  var cart = new Cart(user.carrito[0]);
  cart.delete(prodId);
  req.session.cart = cart;
  var body = {
    carrito: cart
  }
  editUser(user, body);
  res.redirect('/carrito');
});

generateArray = function (cart) {
  var arr = [];
  for (const p in cart) {
    arr.push(cart[p]);
  }
  return arr;
}

module.exports = router;