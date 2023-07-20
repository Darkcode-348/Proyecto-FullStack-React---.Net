import React from "react";
import bancologo from "../assets/bancopichincha.svg";

function Header() {
  return (
    <div className="Header">
      <header>
        <img
          src={bancologo}
          alt="Banco Pichincha"
          style={{ width: "300px", height: "150px" }}
        />
      </header>
    </div>
  );
}
export default Header;
