const repo = require("../repositories/indicacoes.repository");

exports.listarPorTipo = async (tipo) => {
    const indicacoes = await repo.getAll();
    return indicacoes.filter(i => i.tipo.toLowerCase() === tipo.toLowerCase());
};

exports.criar = async (novaInd, tipo) => {
    if (!novaInd.nome || !novaInd.quem) {
        throw new Error("Campos obrigatórios faltando.");
    }

    const atuais = await repo.getAll();

    const nova = {
        id: Date.now().toString(),
        ...novaInd,
        tipo,
        assistido: false
    };

    atuais.push(nova);
    await repo.saveAll(atuais);

    return nova;
};

exports.atualizar = async (id, assistido) => {
    let indicacoes = await repo.getAll();
    let found = false;

    indicacoes = indicacoes.map(i => {
        if (i.id === id) {
            found = true;
            return { ...i, assistido };
        }
        return i;
    });

    if (!found) return false;

    await repo.saveAll(indicacoes);
    return true;
};

exports.deletar = async (id) => {
    const indicacoes = await repo.getAll();
    const filtrado = indicacoes.filter(i => i.id !== id);

    await repo.saveAll(filtrado);
    return filtrado;
};