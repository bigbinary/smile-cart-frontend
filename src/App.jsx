import React from "react";

import { SNEAKERS } from "components/constants";
import Product from "components/Product";

const App = () => (
  <div className="p-4">
    <Product {...SNEAKERS} />
  </div>
);

export default App;
