import React from "react";

import Header from "components/commons/Header";
import { NoData } from "neetoui";
import { sum, prop, pipe, map, isEmpty } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

const Cart = () => {
  const cartItems = useCartItemsStore(prop("cartItems"));
  const totalMrp = pipe(
    map(({ mrp, quantity }) => mrp * quantity),
    sum
  )(cartItems);

  const offerPrice = pipe(
    map(({ offerPrice, quantity }) => offerPrice * quantity),
    sum
  )(cartItems);

  if (isEmpty(cartItems)) {
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
        {cartItems.map(cartItem => (
          <ProductCard key={cartItem.id} {...cartItem} />
        ))}
        <PriceCard {...{ offerPrice, totalMrp }} />
      </div>
    </>
  );
};

export default Cart;
