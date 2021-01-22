import React from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";

import "./style.css";

function HeaderComponent() {
  return (
    <div className="Header-Container">
      <div className="Logo-Header">
        <div className="Logo-Header-Container">
          <img
            className="Logo-Header-Image"
            src="/images/Logo.png"
            alt=""
            width="35px"
            height="35px"
          />
        </div>
        <div className="Font-Header-Container">
          <a className="Font-Header" href="/">
            Binário Mimos
          </a>
        </div>
      </div>

      <div className="Cart-Icon-Header-Container">
        <span className="Circle-Count_">
          <span>0</span>
        </span>

        <a className="Icon-Header" href="/cart">
          <FaShoppingCart />
        </a>
      </div>
      <div className="Profile-Icon-Header-Container">
        <a className="Icon-Header" href="/profile">
          <FaUser />
        </a>
      </div>
    </div>
  );
}

export default HeaderComponent;
