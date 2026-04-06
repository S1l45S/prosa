const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

// auth.controller.js
exports.cadastro = async (req, res) => {
    try {
        const user = await userService.criarUsuario(req.body);
        const token = jwt.sign({  id: user.id, nickName: user.nickName }, process.env.JWT_SECRET);
        res.json({ user, token });
    } catch (e) {
        if (e.message.includes("Email já está em uso")) {
            return res.status(400).json({ erro: e.message });
        }

        res.status(500).json({ erro: "Erro interno" });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await userService.login(req.body.email, req.body.senha);
        const token = jwt.sign({ id: user.id, nickName: user.nickName }, process.env.JWT_SECRET);
        res.json({ token, nome: user.nome });

    } catch (e) {
        if (e.message.includes("Email não Cadastrado.")) {
            return res.status(403).json({ erro: e.message });
        }
        else if (e.message.includes("Email ou Senha Incorretos.")) {
            return res.status(403).json({ erro: e.message });
        }
        res.status(500).json({ erro: "Erro interno" });
    }
};
