import React, { useEffect, useState } from "react";

import { findById } from "neetocommons/pure";
import { Button, Input } from "neetoui";
import useCartItemsStore from "stores/useCartItemsStore";

import TooltipWrapper from "./commons/TooltipWrapper";

const AddToCart = ({ id, availableQuantity }) => {
  const { cartItems, updateQuantity } = useCartItemsStore.pick();

  const handleChange = e => {
    if (e.target.value > availableQuantity) {
      setSelectedQuantity(availableQuantity);
    } else {
      setSelectedQuantity(e.target.value);
      //TODO: Should be a number.
    }
  };

  const [selectedQuantity, setSelectedQuantity] = useState(
    findById(id, cartItems)?.quantity ?? 0
  );

  useEffect(() => {
    updateQuantity(id, selectedQuantity);
  }, [selectedQuantity, id, updateQuantity]);

  if (selectedQuantity === 0) {
    return (
      <Button
        className="bg-neutral-800 hover:bg-neutral-950"
        label="Add to cart"
        size="large"
        onClick={() => setSelectedQuantity(prevQuantity => prevQuantity + 1)}
      />
    );
  }

  return (
    <div className="neeto-ui-border-black flex items-center border">
      <Button
        className="focus-within:ring-0 hover:bg-transparent"
        label="-"
        style="text"
        onClick={() => setSelectedQuantity(prevQuantity => prevQuantity - 1)}
      />
      <Input
        nakedInput
        contentSize="2"
        value={selectedQuantity}
        onChange={handleChange}
      />
      <TooltipWrapper
        showTooltip={selectedQuantity >= availableQuantity}
        tooltipProps={{
          content: "Maximum quantity reached for this item in the cart.",
          position: "top",
        }}
      >
        <Button
          className="focus-within:ring-0 hover:bg-transparent"
          disabled={selectedQuantity >= availableQuantity}
          label="+"
          style="text"
          onClick={() => setSelectedQuantity(prevQuantity => prevQuantity + 1)}
        />
      </TooltipWrapper>
    </div>
  );
};

export default AddToCart;
