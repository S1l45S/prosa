const router = require("express").Router();
const ctrl = require("../controllers/indicacoes.controller");

router.get("/:tipo", ctrl.top);

module.exports = router;