/* eslint-disable @bigbinary/neeto/use-common-routes */
import React from "react";

import { Typography } from "neetoui";
import { useHistory } from "react-router-dom";

import AddToCart from "../AddToCart";

const ProductListItem = ({
  imageUrl,
  name,
  offerPrice,
  availableQuantity,
  slug,
}) => {
  const history = useHistory();

  return (
    <div
      className="border neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between p-4"
      onClick={() => history.push(`products/${slug}`)}
    >
      <img alt={name} className="aspect-square h-40 w-40" src={imageUrl} />
      <Typography className="text-center" weight="semibold">
        {name}
      </Typography>
      <Typography>${offerPrice}</Typography>
      <div className="flex items-center justify-end">
        <AddToCart {...{ availableQuantity, slug }} />
      </div>
    </div>
  );
};

export default ProductListItem;
