import React from "react";

import Thumbnail from "./Thumbnail";

import { PRODUCTS } from "../constants";

const Products = () => (
  <div className="grid grid-cols-2 gap-y-6 p-4 sm:grid-cols-3 lg:grid-cols-5">
    {PRODUCTS.map(
      ({
        id: key,
        offerPrice: price,
        name: title,
        slug,
        images: [imageUrl],
        availableQuantity,
      }) => (
        // eslint-disable-next-line react/jsx-key, react/react-in-jsx-scope
        <Thumbnail
          {...{ availableQuantity, imageUrl, key, price, slug, title }}
        />
      )
    )}
  </div>
);

export default Products;
