import React from "react";

import { Button, Typography } from "neetoui";

import AddToCart from "./AddToCart";
import Carousel from "./commons/Carousel";
import Header from "./commons/Header";

const Product = ({
  id,
  name,
  description,
  mrp,
  offerPrice,
  discountRate,
  availableQuantity,
  images,
}) => (
  <>
    <Header title={name} />
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
            className="bg-neutral-800 hover:bg-neutral-950"
            label="Buy now"
            size="large"
          />
        </div>
      </div>
    </div>
  </>
);

export default Product;
