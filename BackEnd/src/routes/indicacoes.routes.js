const router = require("express").Router();
const ctrl = require("../controllers/indicacoes.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.use(authMiddleware); 
router.get("/:tipo", ctrl.listar);
router.post("/criar", ctrl.criar);
router.put("/:id", ctrl.atualizar);
router.delete("/:id", ctrl.deletar);
router.get("/detalhes/:categoria/:nome", ctrl.detalhes);

module.exports = router;
