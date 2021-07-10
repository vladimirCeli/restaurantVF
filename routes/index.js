var { Router } = require("express");
var router = Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Bienvenido a La Place" });
});

module.exports = router;
