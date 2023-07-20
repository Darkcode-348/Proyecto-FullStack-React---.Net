import React from "react";
import { createRoot, RouterProvider, BrowserRouter } from "react-dom/client";
import Modal from 'react-modal';
import Router from "./routers/Router.jsx";

Modal.setAppElement('#root'); 

createRoot(document.getElementById("root")).render(<Router />);


