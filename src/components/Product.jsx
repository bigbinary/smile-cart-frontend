import React from "react";

import { isNotEmpty } from "@bigbinary/neeto-commons-frontend/pure";
import { Button, Typography } from "@bigbinary/neetoui";
import { prop } from "ramda";
import { AiOutlineShoppingCart } from "react-icons/ai";

import AddToCart from "./AddToCart";
import Carousel from "./commons/Carousel";
import useCartItemsStore from "./useCartItemsStore";

const Product = ({
  id,
  name,
  description,
  mrp,
  offerPrice,
  discountRate,
  availableQuantity,
  images,
}) => {
  const cartItems = useCartItemsStore(prop("cartItems"));

  return (
    <>
      <div className="mx-6 mb-2 flex justify-between">
        <Typography style="h1">{name}</Typography>
        <div className="flex flex-col">
          {cartItems && isNotEmpty(cartItems) && (
            <span className="neeto-ui-border-black neeto-ui-rounded-full flex h-5 w-5 min-w-fit items-center self-end border p-1">
              {cartItems?.length}
            </span>
          )}
          <AiOutlineShoppingCart size="2rem" />
        </div>
      </div>
      <hr className="neeto-ui-bg-black h-1" />
      <div className="mt-6 flex gap-6">
        <Carousel className="basis-2/5" {...{ images }} />
        <div className="basis-3/5 space-y-4">
          <Typography style="body1">{description}</Typography>
          <Typography style="body1">MRP: ${mrp}</Typography>
          <Typography weight="bold">Offer price: ${offerPrice}</Typography>
          <Typography
            className="neeto-ui-text-success-800"
            style="body1"
            weight="extrabold"
          >
            {discountRate}% off
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ availableQuantity, id }} />
            <Button
              className="neeto-ui-bg-black hover:neeto-ui-bg-black"
              label="Buy now"
              size="large"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
