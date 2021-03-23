import axios from "axios";
import {
  LOGOUT,
  TOKEN_FAIL,
  TOKEN_LOGIN_REQUEST,
  TOKEN_REGISTER_REQUEST,
  TOKEN_SUCCESS,
} from "../../Constants/User";

export const tokenValidation = (token, auth) => async (dispatch) => {
  try {
    if (auth) {
      const { data } = await axios.get("/api/users/profile", {
        headers: {
          "x-access-token": token,
        },
      });
      dispatch({ type: TOKEN_SUCCESS, payload: data });

      localStorage.setItem("tkn", JSON.stringify({ token }));
    }
  } catch (error) {
    dispatch({
      type: TOKEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users/login", { email, password });
    dispatch({ type: TOKEN_LOGIN_REQUEST, payload: data });
  } catch (error) {
    dispatch({
      type: TOKEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch({
      type: TOKEN_REGISTER_REQUEST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOKEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("tkn");
  localStorage.removeItem("cart");
  dispatch({ type: LOGOUT });
};
