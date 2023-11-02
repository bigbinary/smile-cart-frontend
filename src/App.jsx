import React from "react";

import { ReactQueryDevtools } from "react-query/devtools";
import { HashRouter, Route, Switch } from "react-router-dom";
import routes from "routes";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import PageNotFound from "./components/commons/PageNotFound";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact component={Product} path={routes.products.show} />
      <Route exact component={ProductsList} path={routes.root} />
      <Route exact component={Cart} path={routes.cart} />
      <Route exact component={Checkout} path={routes.checkout} />
      <Route component={PageNotFound} path="*" />
    </Switch>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </HashRouter>
);

export default App;
