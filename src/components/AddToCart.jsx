import React from "react";

import { findById } from "@bigbinary/neeto-commons-frontend/pure";
import { Button, Typography } from "@bigbinary/neetoui";
import { isEmpty, pick } from "ramda";
import { shallow } from "zustand/shallow";

import useCartItemsStore from "./useCartItemsStore";

const AddToCart = ({ id, availableQuantity }) => {
  const { cartItems, updateQuantity } = useCartItemsStore(
    pick(["cartItems", "updateQuantity"]),
    shallow
  );

  const selectedQuantity = findById(id, cartItems)?.quantity;

  if (isEmpty(cartItems)) {
    return (
      <Button
        className="neeto-ui-bg-black"
        label="Add to cart"
        onClick={() => updateQuantity(id, 1)}
      />
    );
  }

  return (
    <div>
      <Button
        disabled={isEmpty(cartItems)}
        label="-"
        style="text"
        onClick={() => updateQuantity(id, selectedQuantity - 1)}
      />
      <Typography style="body1">{selectedQuantity}</Typography>
      <Button
        disabled={cartItems.length >= availableQuantity}
        label="+"
        style="text"
        onClick={() => updateQuantity(id, selectedQuantity + 1)}
      />
    </div>
  );
};

export default AddToCart;
