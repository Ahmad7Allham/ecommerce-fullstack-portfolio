const { default: axiosClient } = require("./axiosClient");

const getLatestProducts = () => axiosClient.get("/products?populate=*");

// Search the products collection by the public URL slug.
const getProductBySlug = (slug) =>
     axiosClient.get(
          `/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
     );

// Keep this for old links and for products whose slug has not been filled in yet.
const getProductById = (documentId) =>
     axiosClient.get(`/products/${encodeURIComponent(documentId)}?populate=*`);

const getProductsByCategory = (category) =>
     axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);

export default {
     getLatestProducts,
     getProductBySlug,
     getProductById,
     getProductsByCategory,
};
