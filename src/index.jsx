import React from "react";

import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import queryClient from "utils/queryClient";

import initializeAxios from "./apis/axios";
import "./common/i18n";
import { initializeLogger } from "./common/logger";
//i18n should load before App initialization. Hence, disabling import/order rule.
// eslint-disable-next-line import/order
import App from "./App";
import "./index.css";

initializeAxios();
initializeLogger();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
