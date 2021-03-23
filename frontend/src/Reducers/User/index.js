import {
  TOKEN_LOGIN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAIL,
  LOGOUT,
  TOKEN_REGISTER_REQUEST,
  HISTORY_ADDED,
} from "../../Constants/User";

export const userAuthReducer = (state = {}, action) => {
  switch (action.type) {
    case TOKEN_LOGIN_REQUEST:
      return { loading: true, tkn: action.payload };
    case TOKEN_REGISTER_REQUEST:
      return { loading: true, tkn: action.payload };
    case TOKEN_SUCCESS:
      return { loading: false, info: action.payload };
    case TOKEN_FAIL:
      return { loading: false, error: action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
