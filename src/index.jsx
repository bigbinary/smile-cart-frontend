import React from "react";

import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import queryClient from "utils/queryClient";

import App from "./App";
import "./common/i18n";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <React.StrictMode>
        <ToastContainer />
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </QueryClientProvider>
);
