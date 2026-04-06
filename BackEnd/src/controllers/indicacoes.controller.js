const service = require("../services/indicacoes.service");
const external = require("../services/external.service");

exports.listar = async (req, res) => {
    try {
        const data = await service.listarPorTipo(req.params.tipo);
        res.json(data);
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const data = await service.criar(req.body);
        res.status(201).json(data);
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
};

exports.atualizar = async (req, res) => {
    const ok = await service.atualizar(req.params.id, req.body.assistido);
    ok ? res.json({ ok }) : res.status(404).json({ erro: "Não encontrado" });
};

exports.deletar = async (req, res) => {
    const data = await service.deletar(req.params.id);
    res.json(data);
};

exports.detalhes = async (req, res) => {
    try {
        const data = await external.buscarDetalhes(req.params.categoria, req.params.nome);
        res.json(data);
    } catch {
        res.status(404).json({ erro: "Não encontrado" });
    }
};

exports.top = async (req, res) => {
    try {
        const data = await service.getTop();
        res.json(data);
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
};