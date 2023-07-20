import React from "react";
import ReactModal from "react-modal"; // no es un framework ni tampoco un diseño pre-fabricado, es una funcionalidad de react
import "../style/App.css";
import Button from "../components/Button";
import bancologo from "../assets/bancopichincha.svg";
import portadaformulario from "../assets/portadaformulario.svg";

const Modal = ({ isOpen, handleCloseModal, children, title, subtitle }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Formulario"
      onRequestClose={handleCloseModal}
      className="Modal"
      overlayClassName="Overlay"
    >
      <div style={{ position: "fixed", width: "100%" }}>
        <img
          src={bancologo}
          alt="Banco Pichincha"
          style={{ width: "280px", height: "120px", position: "relative" }}
        />
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        {children}
      </div>
      <div className="contenedor">
        <div className="item">
          {" "}
          <Button text="Salir" onClick={handleCloseModal} />
        </div>
      </div>
      <div className="form-image">
        <img src={portadaformulario} alt="Portada del formulario" />
      </div>
    </ReactModal>
  );
};

export default Modal;
