const userService = require("../services/user.service");

exports.adicionarWatchlist = async (req, res) => {
    try {
        const { userId, indId } = req.params;

        const ok = await userService.adicionarWatchlist(userId, indId);

        if (!ok) {
            return res.status(404).json({ erro: "Usuário ou indicação não encontrados." });
        }

        res.json({ mensagem: "Adicionado à watchlist com sucesso!" });
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
};
