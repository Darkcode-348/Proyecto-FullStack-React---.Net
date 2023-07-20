import React, { useState, useEffect } from "react";
import Table from "../../components/Tabla"; // Asegúrate de que el nombre del componente sea correcto
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import FormCuenta from "./utils/FormCuenta";
import "../../style/App.css";
import { UrlApi } from "../../../Config";
import axios from "axios";

const convertToActivoInactivo = (data) => {
  return data.map((item) => ({
    ...item,
    estado: item.estado ? "Activo" : "Inactivo",
  }));
};

const headers = ["numeroCuenta", "tipoCuenta", "saldo", "estado", "cliente"];
const headerTitles = {
  numeroCuenta: "N° Cuenta",
  tipoCuenta: "Tipo de Cuenta",
  saldo: "Saldo Inicial",
  estado: "Estado",
  cliente: "Titular",
};

function cuenta() {
  const [datos, setDatos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resultadobusqueda, setResultadoBusqueda] = useState([]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    async function getDatos() {
      try {
        const response = await axios.get(
          `${UrlApi.Vite_Api_url}/cuentas/Listar`
        );
        const convertedData = convertToActivoInactivo(response.data);
        setDatos(convertedData);
        setResultadoBusqueda(convertedData);
      } catch (error) {
        setDatos([]);
      }
    }
    getDatos();
  }, []);

  const Buscar = (e) => {
    const texto1 = e.target.value.toLocaleUpperCase();
    setBuscar(texto1);
    const texto = String(e.target.value).toLocaleUpperCase();
    const resultado = resultadobusqueda.filter(
      (b) =>
        String(b.numeroCuenta).toLocaleUpperCase().includes(texto) ||
        String(b.cliente).toLocaleUpperCase().includes(texto)
    );
    const convertedData = convertToActivoInactivo(resultado);
    setDatos(convertedData);
  };

  return (
    <div style={{ width: 1880 }}>
      <h1>Cuenta</h1>
      <p>Buscar por Número de Cuenta o Títular</p>
      <input
        type="search"
        placeholder="Buscar"
        className="input"
        value={buscar}
        onChange={Buscar}
        style={{ marginBottom: "10px", marginRight: "45%", fontSize: 15 }}
      />
      <Modal
        isOpen={showModal}
        handleCloseModal={handleCloseModal}
        title={"ATENCIÓN AL CLIENTE"}
        subtitle={"Creación de cuenta de usuario"}
      >
        <FormCuenta />
      </Modal>
      <Button text="Nuevo" onClick={handleOpenModal} />
      <Table headers={headers} headerTitles={headerTitles} data={datos} />;
    </div>
  );
}

export default cuenta;
