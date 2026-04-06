const { userApi } = require("../config/axios");

exports.getAll = async () => {
    const res = await userApi.get("/latest");
    return res.data.record;
};

exports.saveAll = async (data) => {
    await userApi.put("/", data);
};

exports.findById=async(id)=>{
    const res = await userApi.get("/latest");
    const user = res.data.record.find(user=>user.id===id)
    return user

    

}
