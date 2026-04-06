const axios = require("axios");

const indApi = axios.create({
    baseURL: `https://api.jsonbin.io/v3/b/${process.env.INDICACOES_BIN_ID}`,
    headers: { "X-Master-Key": process.env.MASTER_KEY }
});

const userApi = axios.create({
    baseURL: `https://api.jsonbin.io/v3/b/${process.env.USER_BIN_ID}`,
    headers: { "X-Master-Key": process.env.MASTER_KEY }
});

module.exports = { indApi, userApi };