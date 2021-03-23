import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register, tokenValidation } from "../../Actions/User";

import "./style.css";
import "../../global.css";

export default function RegisterScreen({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const user = useSelector((state) => state.user);
  const { info } = user;

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("A senha está diferente da confirmação.");
    } else {
      dispatch(register(name, email, password));
    }
  };

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
          <h1>Cadastro</h1>
        </div>
        <div className="flex center">
          <div className="input-icon">
            <FaUser />
          </div>
          <input
            name="name"
            placeholder="Nome"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
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
        <div className="flex center margin-top-10 ">
          <div className="flex center margin-10">
            <div className="input-icon">
              <FaLock />
            </div>
            <input
              className=" input-password"
              name="password"
              placeholder="Senha"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex center margin-10">
            <div className="input-icon">
              <FaLock />
            </div>
            <input
              className=" input-password"
              name="password"
              placeholder="Confirmar Senha"
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex center">
          <span>Já tem uma conta? </span>
          <Link
            className="link-redirect"
            to={`/login?redirecionar=${redirect}`}
          >
            Entrar
          </Link>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
