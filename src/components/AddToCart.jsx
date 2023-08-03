import React, { useEffect, useState } from "react";

import { findById } from "@bigbinary/neeto-commons-frontend/pure";
import { Button, Input } from "@bigbinary/neetoui";
// import { pick } from "ramda";
// import { shallow } from "zustand/shallow";

import TooltipWrapper from "./commons/TooltipWrapper";
import useCartItemsStore from "./useCartItemsStore";

const AddToCart = ({ id, availableQuantity }) => {
  // const { cartItems, updateQuantity } = useCartItemsStore(
  //   pick(["cartItems", "updateQuantity", "addItem"]),
  //   shallow
  // );
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
        className="neeto-ui-bg-black hover:neeto-ui-bg-black"
        label="Add to cart"
        size="large"
        onClick={() => setSelectedQuantity(prevQuantity => prevQuantity + 1)}
      />
    );
  }

  return (
    <div className="flex flex-row items-center">
      <Button
        label="-"
        style="text"
        onClick={() => setSelectedQuantity(prevQuantity => prevQuantity - 1)}
      />
      {/* TODO: Limit the width of input component */}
      <Input
        // nakedInput
        // className="shrink"
        value={selectedQuantity}
        onChange={handleChange}
      />
      <TooltipWrapper
        disabled={selectedQuantity >= availableQuantity}
        tooltipProps={{
          content: "Maximum quantity reached for this item in the cart.",
        }}
      >
        <Button
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
