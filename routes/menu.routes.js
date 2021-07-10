const { Router } = require("express");
const router = Router();

const {renderMenu,renderCarrito} = require('../controllers/menu.controllers');

router.get("/menu", renderMenu);

router.get("/carrito", renderCarrito);

module.exports = router;