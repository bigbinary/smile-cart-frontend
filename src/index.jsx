import React from "react";

import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import App from "./App";
import "./common/i18n";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>
);
