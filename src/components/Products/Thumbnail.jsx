import React from "react";

import { Typography } from "neetoui";

import AddToCart from "../AddToCart";

const Thumbnail = ({ imageUrl, title, price, id, availableQuantity }) => (
  <div className="neeto-ui-border-black neeto-ui-rounded-xl flex h-60 w-48 flex-col items-center border p-4">
    <div className="relative">
      <img alt={title} className="aspect-square" src={imageUrl} />
      <div className="absolute inset-x-4 bottom-4">
        <AddToCart {...{ availableQuantity, id }} />
      </div>
    </div>
    <Typography weight="semibold">{title}</Typography>
    <Typography>${price}</Typography>
  </div>
);

export default Thumbnail;
