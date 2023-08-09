import React from "react";

import Header from "components/commons/Header";
import { NoData } from "neetoui";
import { sum, prop, pipe, map, isEmpty, filter, includes, keys } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

import { PRODUCTS } from "../constants";

const Cart = () => {
  const cartItems = useCartItemsStore(prop("cartItems"));

  const products = filter(
    obj => includes(prop("id", obj), keys(cartItems)),
    PRODUCTS
  );

  const totalMrp = pipe(
    map(({ mrp, id }) => mrp * cartItems[id]),
    sum
  )(products);

  const offerPrice = pipe(
    map(({ offerPrice, id }) => offerPrice * cartItems[id]),
    sum
  )(products);

  if (isEmpty(products)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <NoData title="Your cart is empty!" />
      </div>
    );
  }

  return (
    <>
      <Header title="My cart" />
      <hr className="neeto-ui-bg-black h-1" />
      <div className="mt-10 flex w-full flex-row justify-center space-x-10">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
        <PriceCard {...{ offerPrice, totalMrp }} />
      </div>
    </>
  );
};

export default Cart;
