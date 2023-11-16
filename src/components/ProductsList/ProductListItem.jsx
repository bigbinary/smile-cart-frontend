import React, { memo } from "react";

import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import AddToCart from "../AddToCart";

const ProductListItem = ({
  imageUrl,
  name,
  offerPrice,
  isInCart,
  toggleCartPresence,
  slug,
}) => (
  <Link
    className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4"
    to={buildUrl(routes.products.show, { slug })}
  >
    <img alt={name} className="h-40 w-40" src={imageUrl} />
    <Typography className="text-center" weight="semibold">
      {name}
    </Typography>
    <Typography>${offerPrice}</Typography>
    <AddToCart {...{ isInCart, toggleCartPresence }} />
  </Link>
);

export default memo(ProductListItem);
