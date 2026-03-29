const { userApi } = require("../config/axios");

exports.getAll = async () => {
    const res = await userApi.get("/latest");
    return res.data.record;
};

exports.saveAll = async (data) => {
    await userApi.put("/", data);
};
