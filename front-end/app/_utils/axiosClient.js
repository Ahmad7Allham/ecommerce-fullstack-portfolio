const { default: axios } = require("axios");

const baseURL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  "https://ecommerce-strapi.ahmad-portfolio.blitz.cloud/api";

const axiosClient = axios.create({
  baseURL,
});

export default axiosClient;