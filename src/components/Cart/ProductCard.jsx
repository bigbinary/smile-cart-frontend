import React from "react";

import ProductQuantity from "components/ProductQuantity";
import { Delete } from "neetoicons";
import { Typography } from "neetoui";
import useCartItemsStore from "stores/useCartItemsStore";

const ProductCard = ({
  id,
  images,
  offerPrice,
  mrp,
  name,
  availableQuantity,
}) => {
  const { removeCartItem } = useCartItemsStore.pick();

  return (
    <div
      className="neeto-ui-rounded neeto-ui-border-black h-1/2 w-1/3 border p-2"
      key={id}
    >
      <div className="flex w-full items-center">
        <img alt={name} height="100px" src={images[0]} width="100px" />
        <div className="flex-grow space-y-1">
          <Typography className="mb-2" style="h3" weight="bold">
            {name}
          </Typography>
          <Typography style="body2">MRP: ${mrp}</Typography>
          <Typography style="body2">Offer price: ${offerPrice}</Typography>
        </div>
        <div className="flex items-center space-x-2">
          <ProductQuantity {...{ availableQuantity, id }} />
          <Delete
            className="cursor-pointer"
            onClick={() => removeCartItem(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
