/* eslint-disable @bigbinary/neeto/use-common-routes */
import React from "react";

import { Typography } from "neetoui";
import { useHistory } from "react-router-dom";

import AddToCart from "../AddToCart";

const Thumbnail = ({ imageUrl, title, price, id, availableQuantity, slug }) => {
  const history = useHistory();

  return (
    <div
      className="neeto-ui-border-black neeto-ui-rounded-xl flex h-60 w-48 flex-col items-center border p-4"
      onClick={() => history.push(`products/${slug}`)}
    >
      <div className="relative">
        <img alt={title} className="aspect-square h-40 w-40" src={imageUrl} />
        <div className="absolute inset-x-4 bottom-4">
          <AddToCart {...{ availableQuantity, id }} />
        </div>
      </div>
      <Typography weight="semibold">{title}</Typography>
      <Typography>${price}</Typography>
    </div>
  );
};

export default Thumbnail;
