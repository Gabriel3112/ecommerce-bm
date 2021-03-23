import React, { useEffect } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import HeaderComponent from "./Components/Header";

import FooterComponent from "./Components/Footer";

import HomeScreenDesktop from "./Screens/Home";
import ProductScreenDesktop from "./Screens/Product";
import CartScreen from "./Screens/Cart";
import LoginScreen from "./Screens/Login";
import RegisterScreen from "./Screens/Register";

import { tokenValidation } from "./Actions/User";
import ShippingScreen from "./Screens/Shipping";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.tkn) {
      dispatch(tokenValidation(user.tkn.token, true));
    }
  }, [dispatch, user]);
  return (
    <BrowserRouter>
      <div className="Container">
        <div className="header">
          <HeaderComponent />
        </div>

        <div className="main">
          <Route path="/" component={HomeScreenDesktop} exact />
          <Route path="/produto/:id" component={ProductScreenDesktop} />
          <Route path="/carrinho/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/cadastro" component={RegisterScreen} />
          <Route path="/envio" component={ShippingScreen} />
        </div>

        <div className="footer">
          <FooterComponent />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
