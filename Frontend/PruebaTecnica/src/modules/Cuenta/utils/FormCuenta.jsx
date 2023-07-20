import React, { useState, useEffect } from "react";
import "../../../style/App.css";
import "../../../style/switch.css";
import Button from "../../../components/Button";
import Notification from "../../../components/Notification";
import { UrlApi } from "../../../../Config";
import axios from "axios";

function FormCuenta() {
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

  const [formData, setFormData] = useState({
    identificacion: "",
    cliente: "",
    clienteid: 0,
    numeroCuenta: "",
    tipoCuenta: "",
    saldoInicial: "",
    estado: true,
  });

  const limpiarFormulario = () => {
    setFormData({
      identificacion: "",
      cliente: "",
      clienteid: 0,
      numeroCuenta: "",
      tipoCuenta: "",
      saldoInicial: "",
      estado: true,
    });
  };

  const Grabar = async () => {
    try {
      const { data } = await axios.post(
        `${UrlApi.Vite_Api_url}/cuentas`,
        formData
      );
      if (data === 200) {
        setShowNotification(true);
       
        handleShowNotification("¡Datos enviados con éxito!", "snackbar");
      }
    } catch (error) {
      if (error.response && error.response.data === "El número de cuenta ya existe") {
        const errorMessage = error.response.data;
        handleShowNotification(errorMessage, "snackbar-error");
      } else {
        handleShowNotification(
          "Falla de conexión o fuera de servicio",
          "snackbar-error"
        );
      }
    } finally {
      limpiarFormulario();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Grabar();
  };

  useEffect(() => {
    if (formData.identificacion !== "") {
      axios
        .get(
          `${UrlApi.Vite_Api_url}/cuentas/buscar?identificacion=${formData.identificacion}`
        )
        .then((res) => {
          if (res.status === 200) {
            const item = res.data;
            setFormData({
              ...formData,
              cliente: item.cliente,
              clienteid: item.clienteId,
            });
          }
        })
        .catch((error) => {
          handleShowNotification(
            "Error a realizar la petición",
            "snackbar-error"
          );
        });
    }
  }, [formData.identificacion]);

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="item">
        <label className="label">Ingrese DNI cliente *</label>
        <input
          className="input"
          type="text"
          id="identificacion"
          name="identificacion"
          maxLength="10"
          value={formData.identificacion}
          onChange={handleChange}
          required
        />
      </div>
      <div className="item">
        <label className="label">Nombres Completos *</label>
        <input
          className="input"
          type="text"
          id="nombre"
          name="nombre"
          value={formData.cliente}
          onChange={handleChange}
          required
        />
      </div>
      <div className="item">
        <label className="label">Número de cuenta *</label>
        <input
          className="input"
          type="text"
          id="numeroCuenta"
          name="numeroCuenta"
          value={formData.numeroCuenta}
          onChange={handleChange}
          maxLength="6"
          required
        />
      </div>
      <div className="item">
        <label className="label" htmlFor="tipocuenta">
          Tipo de cuenta *
        </label>
        <select
          className="input"
          id="tipoCuenta"
          name="tipoCuenta"
          value={formData.tipoCuenta}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una opción</option>
          <option value="Ahorro">Ahorro</option>
          <option value="Corriente">Corriente</option>
        </select>
      </div>
      <div className="item">
        <label className="label" htmlFor="saldoInicial">
          Saldo Inicial *
        </label>
        <div className="input-container">
          <input
            className="input"
            type="number"
            id="saldoInicial"
            name="saldoInicial"
            value={formData.saldoInicial}
            onChange={handleChange}
            placeholder="200.00"
            required
          />
          <span className="input-dolar">$</span>
        </div>
      </div>
      <div className="item">
        <label className="label">Activo</label>
        <label className="switch">
          <input
            type="checkbox"
            id="estado"
            name="estado"
            checked={formData.estado}
            onChange={handleChange}
            disabled
          />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="item">
        {" "}
        <div style={{ paddingTop: 120 }}>{""}</div>
      </div>
      <div className="item">
        {" "}
        <div style={{ paddingTop: 120 }}>{""}</div>
      </div>
      <div className="item">
        {" "}
        <div style={{ paddingTop: 120 }}>{""}</div>
      </div>
      <Button type="submit" text="Enviar" />
      <Notification
        texto={notificationText}
        mode={notificationMode}
        show={showNotification}
        onClose={handleCloseNotification}
      />
    </form>
  );
}

export default FormCuenta;
