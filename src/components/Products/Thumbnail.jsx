import React from "react";

import { Typography } from "neetoui";
import { Link } from "react-router-dom";

import AddToCart from "../AddToCart";

const Thumbnail = ({ imageUrl, title, price, id, availableQuantity, slug }) => (
  <div className="neeto-ui-border-black neeto-ui-rounded-xl flex h-60 w-48 flex-col items-center border p-4">
    <div className="relative">
      <Link to={slug}>
        <img alt={title} className="aspect-square" src={imageUrl} />
      </Link>
      <div className="absolute inset-x-4 bottom-4">
        <AddToCart {...{ availableQuantity, id }} />
      </div>
    </div>
    <Link className="flex flex-col items-center" to={slug}>
      <Typography weight="semibold">{title}</Typography>
      <Typography>${price}</Typography>
    </Link>
  </div>
);

export default Thumbnail;
