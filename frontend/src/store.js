import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./Reducers/Cart";
import { productListReducer, productDetailsReducer } from "./Reducers/Product";
import { userAuthReducer } from "./Reducers/User";

const initialState = {
  user: {
    tkn: localStorage.getItem("tkn")
      ? JSON.parse(localStorage.getItem("tkn"))
      : null,
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userAuthReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
