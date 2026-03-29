const repo = require("../repositories/user.repository");
const bcrypt = require("bcryptjs");
const crypto = require("node:crypto");

exports.criarUsuario = async (user) => {
    if (!user.nome || !user.email || !user.senha || !user.nickname) {
        throw new Error("Campos obrigatórios faltando.");
    }

    const users = await repo.getAll();
    const emailExiste = users.some(
        u => u.email.toLowerCase() === user.email.toLowerCase()
    );

    if (emailExiste) {
        throw new Error("Email já está em uso.");
    }

    const hash = await bcrypt.hash(user.senha, crypto.randomInt(10, 16));

    const novo = {
        id: crypto.randomUUID(),
        ...user,
        senha: hash,
        watchlist: []
    };

    users.push(novo);
    await repo.saveAll(users);

    return novo;
};

exports.login = async (email, senha) => {
    const users = await repo.getAll();

    const user = users.find(u => u.email === email);

    if (!user){
        throw new Error("Email não Cadastrado.");
    };

    const match = await bcrypt.compare(senha, user.senha);

    if(!match){
        throw new Error("Email ou Senha Incorretos.");
    }
    return user;
};

exports.adicionarWatchlist = async (userId, indId) => {
    const users = await repo.getAll();
    const indicacoes = require("../repositories/indicacoes.repository");

    const allInd = await indicacoes.getAll();
    const ind = allInd.find(i => i.id === indId);

    if (!ind) return false;

    let found = false;

    const updated = users.map(u => {
        if (u.id === userId) {
            if (!u.watchlist.some(i => i.id === indId)) {
                u.watchlist.push(ind);
            }
            found = true;
        }
        return u;
    });

    if (!found) return false;

    await repo.saveAll(updated);
    return true;
};