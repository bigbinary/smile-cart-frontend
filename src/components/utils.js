import { dynamicArray } from "neetocommons/pure";
import { modify, concat, __, sum } from "ramda";

import { SAMPLE_PRODUCTS } from "./constants";

export const buildProducts = () =>
  dynamicArray(8, index =>
    SAMPLE_PRODUCTS.map(product =>
      modify("slug", concat(__, `-${index}`), product)
    )
  ).flat();

export const totalPrice = (cartItems, products) =>
  sum(products.map(({ offerPrice, slug }) => offerPrice * cartItems[slug]));
