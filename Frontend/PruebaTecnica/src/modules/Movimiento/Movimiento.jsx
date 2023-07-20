import React, { useState, useEffect } from "react";
import "../../style/App.css";
import Button from "../../components/Button";
import Table from "../../components/Tabla";
import Modal from "../../components/Modal";
import FormMovimiento from "./utils/FormMovimiento";
import { UrlApi } from "../../../Config";
import axios from "axios";

const convertToActivoInactivo = (data) => {
  return data.map((item) => ({
    ...item,
    estado: item.estado ? "Activo" : "Inactivo",
  }));
};

const headers = ["numeroCuenta", "tipoCuenta", "saldo", "estado", "movimiento"];
const headerTitles = {
  numeroCuenta: "N° Cuenta",
  tipoCuenta: "Tipo de Cuenta",
  saldo: "Saldo Inicial",
  estado: "Estado",
  movimiento: "Movimiento",
};

function movimiento() {
  const [datos, setDatos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resultadobusqueda, setResultadoBusqueda] = useState([]);

  const buttonStyle = {
    marginBottom: "10px",
    fontSize: 15,
  };

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
          `${UrlApi.Vite_Api_url}/movimiento/Listar`
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
        String(b.tipoCuenta).toLocaleUpperCase().includes(texto)
    );
    const convertedData = convertToActivoInactivo(resultado);
    setDatos(convertedData);
  };

  return (
    <div style={{ width: 1880 }}>
      <h1>Movimientos</h1>
      <p>Buscar por N° de Cuenta</p>
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
        title={"Servicio de trasferencia"}
        subtitle={"Movimientos Bancarios"}
      >
        <FormMovimiento />
      </Modal>
      <Button text="Realizar Transacción" onClick={handleOpenModal} />
      <Table headers={headers} headerTitles={headerTitles} data={datos} />;
    </div>
  );
}

export default movimiento;
