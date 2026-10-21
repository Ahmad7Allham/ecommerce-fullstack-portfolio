
const { default: axios } = require("axios");

const baseURL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  "http://localhost:1337/api";

const axiosClient = axios.create({
  baseURL,
});

export default axiosClient;
