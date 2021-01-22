import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import HomeScreenDesktop from "./Home";
import ProductScreenDesktop from "./Product";

import "./index.css";

export default function DesktopScreen() {
  return (
    <BrowserRouter>
      <div className="Desktop-Container">
        <Route path="/" component={HomeScreenDesktop} exact />
        <Route path="/product/:id" component={ProductScreenDesktop} />
      </div>
    </BrowserRouter>
  );
}
