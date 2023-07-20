import { Outlet } from "react-router-dom";
import Header from "./Header";
import "../style/App.css";

const Layout = ({ children }) => {
  return (
    <>
      <div
        style={{
          top: 0,
          left: 0,
          margin: 0,
        }}
      >
        <Header />
        <Outlet />
      </div>
      <main className="Principal">{children}</main>
    </>
  );
};

export default Layout;
