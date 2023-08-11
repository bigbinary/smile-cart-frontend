import React from "react";

import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Switch } from "react-router-dom";

import Cart from "./components/Cart";
import PageNotFound from "./components/commons/PageNotFound";
import { SNEAKERS } from "./components/constants";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";
import routes from "./routes";

const App = () => (
  <div className="p-8">
    <Switch>
      <Route exact component={Product} path={routes.product.show} />
      <Route exact component={ProductsList} path={routes.root} />
      <Route
        exact
        path={routes.home}
        render={() => <Product {...SNEAKERS} />}
      />
      <Route exact component={Cart} path={routes.cart} />
      <Route component={PageNotFound} path="*" />
    </Switch>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </div>
);

export default App;
