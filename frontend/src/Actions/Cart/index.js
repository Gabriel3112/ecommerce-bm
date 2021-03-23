import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_FAIL,
  CART_GET,
  CART_REMOVE_ITEM,
  CART_REQUEST,
} from "../../Constants/Cart";

export const getCart = (userId) => async (dispatch) => {
  dispatch({ type: CART_REQUEST });
  const products = [];
  const cart = await axios.get(`/api/users/cart?id=${userId}`);
  cart.data.map(async (item) => {
    const { data } = await axios.get(`/api/products/${item.id}`);
    products.push({
      id: item.id,
      image: data.images[0],
      name: data.name,
      price: data.price,
      quantity: item.quantity,
      quantityInStock: data.quantityInStock,
    });
  });

  dispatch({ type: CART_GET, payload: products });
};
export const addToCart = (userId, productId, quantity) => async (dispatch) => {
  dispatch({ type: CART_REQUEST });
  try {
    if (userId) {
      if (productId && quantity) {
        await axios.put(`/api/users/addCart`, {
          id: userId,
          productId,
          quantity,
        });
      }
      console.log("chegou");
      const products = [];
      const cart = await axios.get(`/api/users/cart?id=${userId}`);
      cart.data.map(async (item) => {
        const { data } = await axios.get(`/api/products/${item.id}`);
        products.push({
          id: item.id,
          image: data.images[0],
          name: data.name,
          price: data.price,
          quantity: item.quantity,
          quantityInStock: data.quantityInStock,
        });
      });

      dispatch({ type: CART_GET, payload: products });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (userId, productId) => async (dispatch) => {
  await axios.put(`/api/users/removeCart`, { id: userId, productId });
  dispatch({ type: CART_REMOVE_ITEM });
};
