const { indApi } = require("../config/axios");

exports.getAll = async () => {
    const res = await indApi.get("/latest");
    return res.data.record;
};

exports.saveAll = async (data) => {
    await indApi.put("/", data);
};