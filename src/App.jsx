import React from "react";

import { ReactQueryDevtools } from "react-query/devtools";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import PageNotFound from "./components/commons/PageNotFound";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";

const App = () => (
  <>
    <Switch>
      <Route exact component={Product} path={routes.products.show} />
      <Route exact component={ProductsList} path={routes.products.index} />
      <Route exact component={Cart} path={routes.cart} />
      <Route exact component={Checkout} path={routes.checkout} />
      <Redirect exact from={routes.root} to={routes.products.index} />
      <Route component={PageNotFound} path="*" />
    </Switch>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </>
);

export default App;
