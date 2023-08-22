import { dynamicArray } from "neetocommons/pure";
import { modify, concat, __, sum } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";

import { SAMPLE_PRODUCTS } from "./constants";

export const buildProducts = () =>
  dynamicArray(8, index =>
    SAMPLE_PRODUCTS.map(product =>
      modify("slug", concat(__, `-${index}`), product)
    )
  ).flat();

export const cartTotalOf = (products, priceKey) => {
  const { cartItems } = useCartItemsStore.getState();

  return sum(
    products.map(product => product[priceKey] * cartItems[product.slug])
  );
};
