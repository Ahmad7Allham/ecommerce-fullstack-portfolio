const { default: axios } = require("axios");

const axiosClient = axios.create({
     baseURL: "http://localhost:1337/api",
});

export default axiosClient;
