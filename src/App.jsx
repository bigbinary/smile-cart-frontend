import React from "react";

import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Switch, Route } from "react-router-dom";
import queryClient from "utils/queryClient";

import PageNotFound from "./components/commons/PageNotFound";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";
import routes from "./routes";

const App = () => (
  <div className="p-8">
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route exact component={Product} path={routes.product.show} />
        <Route exact component={ProductsList} path={routes.root} />
        <Route component={PageNotFound} path="*" />
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </div>
);

export default App;
