const router = require("express").Router();
const ctrl = require("../controllers/auth.controller");

router.post("/cadastro", ctrl.cadastro);
router.post("/login", ctrl.login);

module.exports = router;