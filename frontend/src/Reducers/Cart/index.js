import {
  CART_ADD_ITEM,
  CART_FAIL,
  CART_GET,
  CART_REMOVE_ITEM,
  CART_REQUEST,
} from "../../Constants/Cart";

export const cartReducer = (state = { itens: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      return { message: "Item added in cart." };
    }
    case CART_REMOVE_ITEM:
      return {
        message: "Item removed the cart",
      };
    case CART_REQUEST:
      return { loading: true };
    case CART_GET:
      return { loading: false, itens: action.payload };
    case CART_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
