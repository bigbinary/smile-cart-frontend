import { dynamicArray } from "neetocommons/pure";
import { modify, concat, __, pipe, map, sum } from "ramda";

import { SAMPLE_PRODUCTS } from "./constants";

export const buildProducts = () =>
  dynamicArray(8, index =>
    SAMPLE_PRODUCTS.map(product =>
      modify("slug", concat(__, `-${index}`), product)
    )
  ).flat();

export const totalPrice = (cartItems, products) =>
  pipe(
    map(({ offerPrice, slug }) => offerPrice * cartItems[slug]),
    sum
  )(products);
