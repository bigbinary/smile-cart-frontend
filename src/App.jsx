import { ReactQueryDevtools } from "react-query/devtools";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import PageNotFound from "./components/commons/PageNotFound";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "./components/ProductList/constants";

const App = () => (
  <>
    <Switch>
      <Route exact component={Product} path={routes.products.show} />
      <Route exact component={ProductList} path={routes.products.index} />
      <Route exact component={Cart} path={routes.cart} />
      <Route exact component={Checkout} path={routes.checkout} />
      <Redirect
        exact
        from={routes.root}
        to={buildUrl(routes.products.index, {
          page: DEFAULT_PAGE_INDEX,
          page_size: DEFAULT_PAGE_SIZE,
        })}
      />
      <Route component={PageNotFound} path="*" />
    </Switch>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </>
);

export default App;
