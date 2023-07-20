import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../style/App.css"; // Importa el archivo CSS para los estilos del sidebar

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      {/* <button onClick={handleToggleSidebar}>Toggle Sidebar</button> */}
      <div className={`sidebar ${showSidebar ? "active" : ""}`}>
      <nav className="sidebar">
        <ul className="nav-links">
        <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/cliente">Cliente</Link>
          </li>
          <li>
            <Link to="/cuenta">Cuenta</Link>
          </li>
          <li>
            <Link to="/movimiento">Movimiento</Link>
          </li>
          <li>
            <Link to="/reporte">Reporte</Link>
          </li>
        </ul>
      </nav>
      </div>
      <button className="toggle-button" onClick={handleToggleSidebar}>
        {showSidebar ? "x" : "active"}
      </button>
    </div>
  );
};

export default Sidebar;
