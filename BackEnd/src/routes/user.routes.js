const userRouter = require("express").Router();
const userCtrl = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// protege rota
userRouter.use(authMiddleware);

userRouter.put("/watchlist/:userId/:indId", userCtrl.adicionarWatchlist);

module.exports = userRouter;