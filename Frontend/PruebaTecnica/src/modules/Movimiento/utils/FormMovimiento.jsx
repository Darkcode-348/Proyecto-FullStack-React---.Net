import React, { useState, useEffect } from "react";
import "../../../style/App.css";
import "../../../style/switch.css";
import Button from "../../../components/Button";
import Notification from "../../../components/Notification";
import { UrlApi } from "../../../../Config";
import axios from "axios";

function FormMovimiento() {
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
    fecha: new Date(),
    numeroCuenta: "",
    identificacion: "",
    cliente: "",
    tipoCuenta: "",
    tipoMovimiento: "",
    saldoInicial: 0,
    saldo: 0,
    valor: "",
    estado: true,
  });

  const limpiarFormulario = () => {
    setFormData({
      fecha: new Date(),
      numeroCuenta: "",
      identificacion: "",
      cliente: "",
      tipoCuenta: "",
      tipoMovimiento: "",
      saldoInicial: 0,
      saldo: 0,
      valor: "",
      estado: true,
    });
  };

  const Grabar = async () => {
    try {
      console.log(formData)
      const { data } = await axios.post(
        `${UrlApi.Vite_Api_url}/movimiento`,
        formData
      );
      if (data === 200) {
        setShowNotification(true);

        handleShowNotification("¡Datos enviados con éxito!", "snackbar");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data === "El número de cuenta ya existe"
      ) {
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
    if (formData.numeroCuenta !== "") {
      axios
        .get(
          `${UrlApi.Vite_Api_url}/movimiento/buscar?numerocuenta=${formData.numeroCuenta}`
        )
        .then((res) => {
          if (res.status === 200) {
            const item = res.data;
            setFormData({
              ...formData,
              cliente: item.titular,
              tipoCuenta: item.tipoCuenta,
              saldoInicial: item.saldoInicial,
              saldo: item.saldo,
              estado: item.estado,
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
  }, [formData.numeroCuenta]);

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="item">
        <label className="label">Ingrese la Cuenta Bancaria *</label>
        <input
          className="input"
          type="text"
          id="numeroCuenta"
          name="numeroCuenta"
          maxLength="10"
          value={formData.numeroCuenta}
          onChange={handleChange}
          required
        />
      </div>
      <div className="item">
        <label className="label">Tipo de Cuenta</label>
        <input
          className="input"
          type="text"
          id="tipoCuenta"
          name="tipoCuenta"
          value={formData.tipoCuenta}
          onChange={handleChange}
          required
        />
      </div>
      <div className="item">
        <label className="label">Titular</label>
        <input
          className="input"
          type="text"
          id="nombre"
          name="nombre"
          value={formData.cliente}
          onChange={handleChange}
          maxLength="6"
          required
        />
      </div>
      <div className="item">
        <label className="label" htmlFor="tipoMovimiento">
          Tipo de Movimiento *
        </label>
        <select
          className="input"
          id="tipoMovimiento"
          name="tipoMovimiento"
          value={formData.tipoMovimiento}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una opción</option>
          <option value="Deposito">Depósito</option>
          <option value="Retiro">Rétiro</option>
        </select>
      </div>
      <div className="item">
        <label className="label">Saldo Áctual</label>
        <div className="input-container">
          <input
            className="input"
            type="text"
            id="saldoInicial"
            name="saldoInicial"
            value={formData.saldoInicial}
            onChange={handleChange}
            placeholder="200.00"
            maxLength="1"
            disabled
            required
          />
          <span className="input-dolar">$</span>
        </div>
      </div>
      <div className="item">
        <label className="label" htmlFor="valor">
          Transación *
        </label>
        <div className="input-container">
          <input
            className="input"
            type="number"
            id="valor"
            name="valor"
            value={formData.valor}
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
        <div style={{ paddingTop: 120 }}>{""}</div>
      </div>
      <div className="item">
        <div style={{ paddingTop: 120 }}>{""}</div>
      </div>

      <Button type="submit" text="Realizar Transacisión" />
      <Notification
        texto={notificationText}
        mode={notificationMode}
        show={showNotification}
        onClose={handleCloseNotification}
      />
    </form>
  );
}

export default FormMovimiento;
