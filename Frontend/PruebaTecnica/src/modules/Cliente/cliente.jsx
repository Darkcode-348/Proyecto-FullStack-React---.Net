import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Tabla";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Form from "./utils/Form";
import { UrlApi } from "../../../Config";

const convertToActivoInactivo = (data) => {
  return data.map((item) => ({
    ...item,
    estado: item.estado ? "Activo" : "Inactivo",
  }));
};

const headers = [
  "identificacion",
  "nombre",
  "direccion",
  "telefono",
  "edad",
  "estado",
];

const headerTitles = {
  identificacion: "Cédula",
  nombre: "Titular",
  direccion: "Dirección",
  telefono: "Télefono",
  edad: "Edad",
  estado: "Estado",
};

function Cliente() {
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
          `${UrlApi.Vite_Api_url}/personas/Listar`
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
        String(b.identificacion).toLocaleUpperCase().includes(texto) ||
        String(b.nombre).toLocaleUpperCase().includes(texto)
    );
    const convertedData = convertToActivoInactivo(resultado);
    setDatos(convertedData);
  };

  return (
    <div style={{ width: 1880 }}>
      <h1>Cliente</h1>
      <p>Buscar Cliente por Cédula - Títular</p>
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
        subtitle={"Creación de usuario"}
      >
        <Form />
      </Modal>
      <Button text="Nuevo" onClick={handleOpenModal} />
      <Table headers={headers} headerTitles={headerTitles} data={datos} />;
    </div>
  );
}

export default Cliente;
