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
      className="border neeto-ui-border-black neeto-ui-rounded-xl h-60 flex w-48 flex-col items-center p-4"
      onClick={() => history.push(`products/${slug}`)}
    >
      <img alt={name} className="aspect-square h-40 w-40" src={imageUrl} />
      <Typography weight="semibold">{name}</Typography>
      <Typography>${offerPrice}</Typography>
      <div className="bottom-4 text-center">
        <AddToCart {...{ availableQuantity, slug }} />
      </div>
    </div>
  );
};

export default ProductListItem;
