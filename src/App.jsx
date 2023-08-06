import React from "react";

import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import queryClient from "utils/queryClient";

import PageNotFound from "./components/commons/PageNotFound";
import Product from "./components/Product";
import Products from "./components/Products";
import routes from "./routes";

const App = () => (
  <div className="p-8">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Product />} path={routes.product.show} />
          <Route element={<Products />} path={routes.product.index} />
          <Route
            element={<Navigate replace to={routes.product.index} />}
            path={routes.root}
          />
          <Route element={PageNotFound} path="*" />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </div>
);

export default App;
