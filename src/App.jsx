import React from "react";

import { Route, Switch } from "react-router-dom";

import Cart from "./components/Cart";
import { SNEAKERS } from "./components/constants";
import Product from "./components/Product";
import routes from "./routes";

const App = () => (
  <div className="p-4">
    <Switch>
      <Route
        exact
        path={routes.home}
        render={() => <Product {...SNEAKERS} />}
      />
      <Route component={Cart} path={routes.cart} />
    </Switch>
  </div>
);

export default App;
