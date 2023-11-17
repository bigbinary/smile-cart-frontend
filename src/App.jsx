import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";

import PageNotFound from "./components/commons/PageNotFound";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";

const App = () => (
  <Switch>
    <Route exact component={Product} path={routes.products.show} />
    <Route exact component={ProductsList} path={routes.products.index} />
    <Redirect exact from={routes.root} to={routes.products.index} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
