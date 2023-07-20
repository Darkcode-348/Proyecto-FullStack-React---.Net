import React, { useState, useEffect } from "react";
import "../../style/App.css";
import Button from "../../components/Button";
import Table from "../../components/Tabla";
import Notification from "../../components/Notification";
import { UrlApi } from "../../../Config";
import axios from "axios";

const convertToActivoInactivo = (data) => {
  return data.map((item) => ({
    ...item,
    estado: item.estado ? "Activo" : "Inactivo",
  }));
};

const headers = [
  "fecha",
  "numeroCuenta",
  "titular",
  "tipoCuenta",
  "saldo",
  "estado",
  "tipoMovimiento",
  "valor",
  "saldoDisponible",
];
const headerTitles = {
  fecha: "Fecha",
  numeroCuenta: "N° Cuenta",
  titular: "Títular",
  tipoCuenta: "Tipo de Cuenta",
  saldo: "Saldo Inicial",
  estado: "Estado",
  tipoMovimiento: "Movimiento",
  valor: "Valor",
  saldoDisponible: "Saldo Disponible",
};

function reporte() {
  const [datos, setDatos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [resultadobusqueda, setResultadoBusqueda] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationMode, setNotificationMode] = useState("");

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleShowNotification = (text, mode) => {
    setShowNotification(true);
    setNotificationText(text);
    setNotificationMode(
      mode === "snackbar-error" ? "snackbar-error" : "snackbar"
    );
  };

  const buttonStyle = {
    marginBottom: "10px",
    fontSize: 15,
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
        String(b.titular).toLocaleUpperCase().includes(texto)
    );
    const convertedData = convertToActivoInactivo(resultado);
    setDatos(convertedData);
  };

  const handleGenerarPDF = async () => {
    try {
      const response = await axios.get(
        `${UrlApi.Vite_Api_url}/movimiento/generarpdf`
      );
      if (data === 200) {
        setShowNotification(true);
        handleShowNotification("Descargando PDF", "snackbar");
      }
    } catch (error) {
      handleShowNotification(
        "Falla de conexión o fuera de servicio",
        "snackbar-error"
      );
    }
  };

  return (
    <div style={{ width: 1880 }}>
      <h1>Reportes</h1>
      <p>Buscar por N° de Cuenta o Titular</p>
      <input
        type="search"
        placeholder="Buscar"
        className="input"
        value={buscar}
        onChange={Buscar}
        style={{ marginBottom: "10px", marginRight: "45%", fontSize: 15 }}
      />
      <a href={`${UrlApi.Vite_Api_url}/movimiento/generarpdf`} target="_blank">
        {" "}
        <Button text="Generar PDF" onClick={handleGenerarPDF} />
      </a>
      <Table headers={headers} headerTitles={headerTitles} data={datos} />;
      <Notification
        texto={notificationText}
        mode={notificationMode}
        show={showNotification}
        onClose={handleCloseNotification}
      />
    </div>
  );
}

export default reporte;
