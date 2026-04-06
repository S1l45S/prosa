const repo = require("../repositories/indicacoes.repository");
const external = require("../services/external.service");
const crypto = require("node:crypto");

exports.listarPorTipo = async (tipo) => {
    const indicacoes = await repo.getAll();
    return indicacoes.filter(i => i.tipo.toLowerCase() === tipo.toLowerCase());
};

exports.criar = async (novaInd) => {
    if (!novaInd.titulo || !novaInd.quem || !novaInd.tipo || !novaInd.user_id || !novaInd.nota_comunidade) {
        throw new Error("Campos obrigatórios faltando.");
    }

    const atuais = await repo.getAll();

    const { sinopse, capa } = await external.buscarDetalhes(novaInd.tipo, novaInd.titulo)

    const nova = {
        id: crypto.randomUUID(),
        ...novaInd,
        capa,
        sinopse
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

exports.getManyByIds = async (ids) => {
    const todasGerais = await repo.getAll();
    return todasGerais.filter(f => ids.includes(f.id));
}

exports.getTop = async () => {
    const indicacoes = await repo.getAll();
    const ordenada = indicacoes.sort((a, b) => b.nota_comunidade - a.nota_comunidade);
    const top = ordenada.splice(0, 5)
    return top
};