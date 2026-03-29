const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }
    const parts = authHeader.split(' ');
    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ erro: "Token mal formatado" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ erro: "Token inválido ou expirado" });
        req.userId = decoded.id;
        return next();
    });
};