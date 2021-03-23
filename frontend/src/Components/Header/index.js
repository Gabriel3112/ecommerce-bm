import React, { useState } from "react";
import { FaShoppingCart, FaUser, FaDoorOpen, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../Actions/User";
import { DropdownComponent, DropdownItemComponent } from "../Dropdown";
import "./style.css";
import "../../global.css";

function HeaderComponent() {
  const cart = useSelector((state) => state.cart);
  const { loading, itens } = cart;
  const [itensCart] = useState(itens);
  const user = useSelector((state) => state.user);
  const { info } = user;
  const dispatch = useDispatch();
  const handlerLogout = () => {
    dispatch(logout());
  };
  const location = useLocation();
  const isLogin =
    location.pathname === "/login" || location.pathname === "/cadastro";

  return (
    <div
      className={
        isLogin
          ? "flex center Header-Container"
          : "Header-Container margin-bottom-30"
      }
    >
      <div className={isLogin ? "none" : "Header-Menu-Mobile"}>
        <div className="Header-Icon">
          <FaBars color="#fff" />
        </div>
      </div>
      <div className="Header-Logo flex center">
        <Link to="/">
          <img src="/images/Logo.png" alt="" />
          <span>Binário Mimos</span>
        </Link>
      </div>
      <div className={isLogin ? "none" : "Header-Informations"}>
        <div className="Header-Category">
          <DropdownComponent title="Categorias">
            <DropdownItemComponent to="#materialEscolar">
              <span>Material Escolar</span>
            </DropdownItemComponent>
            <DropdownItemComponent to="#Enfeites">
              <span>Enfeites</span>
            </DropdownItemComponent>
          </DropdownComponent>
        </div>

        <div>
          <Link to="/carrinho" className="Header-Cart">
            <span className="Header-Cart-Count">
              {itensCart.length > 0 && !loading ? itensCart.length : 0}
              <span />
            </span>
            <div className="Header-Icon">
              <FaShoppingCart />
            </div>
          </Link>
        </div>
        <div className="Header-Profile">
          {info ? (
            <div>
              <DropdownComponent
                icon={<FaUser color="#fff" />}
                title={`Bem vindo(a) ${info.name.split(" ")[0]}`}
              >
                <DropdownItemComponent to="/#logout" onClick={handlerLogout}>
                  <span>Sair</span>
                </DropdownItemComponent>
              </DropdownComponent>
            </div>
          ) : (
            <Link className="Header-Icon" to="/login">
              <FaDoorOpen color="#fff" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
