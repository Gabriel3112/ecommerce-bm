import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, tokenValidation } from "../../Actions/User";

import "./style.css";
import "../../global.css";
import PaymentFlowComponent from "../../Components/PaymentFlow";

export default function LoginScreen({ location, history }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);
  const { info } = user;
  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (info) {
      history.push(redirect);
    }
    if (user.tkn) {
      dispatch(tokenValidation(user.tkn.token, user.tkn.auth));
    }
  }, [history, redirect, info, user]);
  return (
    <div className="margin-top-100 flex center">
      <form
        className="flex center collum font-size-15 login-container"
        onSubmit={HandleSubmit}
      >
        <div>
          <h1>Login</h1>
        </div>
        <div className="flex center margin-top-10">
          <div className="input-icon">
            <FaEnvelope />
          </div>
          <input
            name="email"
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex center margin-top-10">
          <div className="input-icon">
            <FaLock />
          </div>
          <input
            name="password"
            placeholder="Senha"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <div className="flex center margin-top-10">
          <span>Não tem uma conta? </span>
          <Link
            className="link-redirect"
            to={`/cadastro?redirecionar=${redirect}`}
          >
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  );
}
