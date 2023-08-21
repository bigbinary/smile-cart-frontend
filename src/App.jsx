import React, { useEffect, useState } from "react";

import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Switch } from "react-router-dom";

import initializeAxios from "./apis/axios";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { PageLoader } from "./components/commons";
import PageNotFound from "./components/commons/PageNotFound";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";
import routes from "./routes";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAxios(setLoading);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <Switch>
        <Route exact component={Product} path={routes.product.show} />
        <Route exact component={ProductsList} path={routes.root} />
        <Route exact component={Cart} path={routes.cart} />
        <Route exact component={Checkout} path={routes.checkout} />
        <Route component={PageNotFound} path="*" />
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
};

export default App;
