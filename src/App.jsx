import { Route, NavLink, Switch } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Product from "./components/Product";

const App = () => (
  <>
    <div className="flex space-x-2">
      <NavLink exact activeClassName="underline font-bold" to="/">
        Home
      </NavLink>
      <NavLink exact activeClassName="underline font-bold" to="/product">
        Product
      </NavLink>
    </div>
    <Switch>
      <Route exact component={Home} path="/" />
      <Route exact component={Product} path="/product" />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);
export default App;
