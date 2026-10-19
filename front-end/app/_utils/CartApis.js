const { default: axiosClient } = require("./axiosClient");

const addToCart = (payload) => axiosClient.post("/carts", payload);

const getUserCartItems = (email) =>
     axiosClient.get(
          `carts?populate[products][populate]=banner&filters[email][$eq]=${email}`,
     );

const deleteCartItem = (documentId) =>
     axiosClient.delete(`/carts/${documentId}`);

export default {
     addToCart,
     getUserCartItems,
     deleteCartItem,
};
