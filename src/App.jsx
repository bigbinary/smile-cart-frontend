import React from "react";

import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Switch, Route, Redirect } from "react-router-dom";
import queryClient from "utils/queryClient";

import PageNotFound from "./components/commons/PageNotFound";
import Product from "./components/Product";
import Products from "./components/Products";
import routes from "./routes";

const App = () => (
  <div className="p-8">
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route exact component={Product} path={routes.product.show} />
        <Route exact component={Products} path={routes.product.index} />
        <Redirect from={routes.root} to={routes.product.index} />
        <Route component={PageNotFound} path="*" />
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </div>
);

export default App;
