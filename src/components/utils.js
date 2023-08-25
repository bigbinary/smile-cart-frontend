import { sum, path, map } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";

export const cartTotalOf = (products, priceKey) => {
  const { cartItems } = useCartItemsStore.getState();

  return sum(
    products.map(product => product[priceKey] * cartItems[product.slug])
  );
};

export const filterProducts = productsResponse =>
  map(path(["data", "data"]), productsResponse).filter(Boolean);
