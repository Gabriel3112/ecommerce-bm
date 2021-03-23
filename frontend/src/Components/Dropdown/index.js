import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.css";

export function DropdownItemComponent({ children, to, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="Dropdown-Item-Container">
      <li>{children}</li>
    </Link>
  );
}

export function DropdownComponent({ icon, title, children }) {
  return (
    <div className="Dropdown-Container">
      <div>
        {icon}
        <span>{title}</span>
        <FaAngleDown />
      </div>
      <ul>{children}</ul>
    </div>
  );
}
