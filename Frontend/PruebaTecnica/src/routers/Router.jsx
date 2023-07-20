import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layout/Index.jsx";
import Sidebar from "../layout/Sidebar.jsx";
import Inicio from "../modules/Inicio/inicio.jsx";
import Cliente from "../modules/Cliente/cliente.jsx";
import Cuenta from "../modules/Cuenta/cuenta.jsx";
import Movimiento from "../modules/Movimiento/Movimiento.jsx";
import Reporte from "../modules/Reporte/Reporte.jsx";

function router() {
  return (
    <Router>
      <Layout>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/cuenta" element={<Cuenta />} />
          <Route path="/movimiento" element={<Movimiento />} />
          <Route path="/reporte" element={<Reporte />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default router;
