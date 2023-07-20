import '../../style/App.css'
import bancologo from "../../assets/bancopichincha.svg";

function incio() {
  return (
    <div style={{ width: 1880 }}>
    <h1>Bienvenido</h1>
    <p>A tu banco</p>
    <img
          src={bancologo}
          alt="Banco Pichincha"
          style={{ width: "900px", height: "2 00px", position: "relative" }}
        />
  </div>
  );
}

export default incio;
