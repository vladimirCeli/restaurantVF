const menuCtrl = {};

menuCtrl.renderMenu = (req, res) => {
  res.render("menu", { title: "Menú" });
};

menuCtrl.renderCarrito = (req, res) => {
  res.render("carrito", { title: "Carrito" });
};

module.exports = menuCtrl;
