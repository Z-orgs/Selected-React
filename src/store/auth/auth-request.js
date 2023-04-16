const { default: axios } = require("api/axios");

export const requestAuthLogin = (data) => {
    return axios.post("/auth/admin/login", {
        data,
    });
};