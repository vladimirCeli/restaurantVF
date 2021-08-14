const { Router } = require("express");
const router = Router();

const {renderMenu,renderCarrito, renderpago, renderpagar} = require('../controllers/menu.controllers');

router.get("/menu", renderMenu);

router.get("/carrito", renderCarrito);
router.get("/success", renderpagar);
router.get("/tarjeta", renderpago);
module.exports = router;