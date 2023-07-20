import React, { useState } from "react";
import "../../../style/App.css";
import "../../../style/switch.css";
import Button from "../../../components/Button";
import eyeOpenImg from "../../../assets/eyesopen.svg";
import eyeCloseImg from "../../../assets/eyesclose.svg";
import Notification from "../../../components/Notification";
import { UrlApi } from "../../../../Config";
import axios from "axios";

function Form() {
  const [showPassword, setShowPassword] = useState(false);
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
    nombre: "",
    genero: "",
    edad: "",
    direccion: "",
    telefono: "",
    contraseña: "",
    estado: true,
  });

  const limpiarFormulario = () => {
    setFormData({
      identificacion: "",
      nombre: "",
      genero: "",
      edad: "",
      direccion: "",
      telefono: "",
      contraseña: "",
      estado: true,
    });
  };

  const Grabar = async () => {
    try {
      const { data } = await axios.post(
        `${UrlApi.Vite_Api_url}/personas`,
        formData
      );
      if (data === 200) {
        setShowNotification(true);

        handleShowNotification("¡Datos enviados con éxito!", "snackbar");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data === "La identificación ya está registrada"
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

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="item">
        <label className="label">Documento de Identidad *</label>
        <input
          type="number"
          id="identificacion"
          name="identificacion"
          className="input"
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
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="item">
        <label className="label" htmlFor="genero">
          Género *
        </label>
        <select
          className="input"
          id="genero"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una opción</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div className="item">
        <label className="label" htmlFor="edad">
          Edad *
        </label>
        <div className="input-container">
          <input
            id="edad"
            name="edad"
            className="input"
            value={formData.edad}
            onChange={handleChange}
            required
          />
          <span className="input-suffix">Años</span>
        </div>
      </div>

      <div className="item">
        <label className="label">Dirección *</label>
        <input
          id="direccion"
          name="direccion"
          className="input"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
      </div>
      <div className="item">
        <label className="label">Télefono *</label>
        <input
          id="telefono"
          name="telefono"
          className="input"
          maxLength="10"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </div>
      <div className="item">
        <label className="label" htmlFor="contraseña">
          Contraseña *
        </label>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            id="contraseña"
            name="contraseña"
            className="input"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
          <button // Botón del ojo para mostrar/ocultar la contraseña
            type="button"
            className="input-eyes"
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src={showPassword ? eyeOpenImg : eyeCloseImg}
              alt="Mostrar contraseña"
              className="input-eyes-icon"
            />
          </button>
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

export default Form;
