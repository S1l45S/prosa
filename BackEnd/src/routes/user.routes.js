const userRouter = require("express").Router();
const userCtrl = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

userRouter.use(authMiddleware);

userRouter.put("/watchlist/add/:userId/:indId", userCtrl.adicionarWatchlist);
userRouter.get("/watchlist/:userId", userCtrl.ListarWT);
module.exports = userRouter;