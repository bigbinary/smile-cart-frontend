import React from "react";

import { Button, Input } from "neetoui";
import { isEmpty, isNil, paths } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

import TooltipWrapper from "./commons/TooltipWrapper";

const AddToCart = ({ id, availableQuantity }) => {
  const [selectedQuantity, updateQuantity] = useCartItemsStore(
    paths([["cartItems", id], ["updateQuantity"]]),
    shallow
  );

  if (isNil(selectedQuantity) || isEmpty(selectedQuantity)) {
    return (
      <Button
        className="bg-neutral-800 hover:bg-neutral-950"
        label="Add to cart"
        size="large"
        onClick={() => updateQuantity(id, 1)}
      />
    );
  }

  return (
    <div className="neeto-ui-border-black flex items-center border">
      <Button
        className="focus-within:ring-0 hover:bg-transparent"
        disabled={selectedQuantity === 0}
        label="-"
        style="text"
        onClick={() => updateQuantity(id, selectedQuantity - 1)}
      />
      <Input nakedInput contentSize="2" value={selectedQuantity} />
      <TooltipWrapper
        showTooltip={selectedQuantity >= availableQuantity}
        tooltipProps={{
          content:
            "Maximum selectedQuantity reached for this item in the cart.",
          position: "top",
        }}
      >
        <Button
          className="focus-within:ring-0 hover:bg-transparent"
          disabled={selectedQuantity >= availableQuantity}
          label="+"
          style="text"
          onClick={() => updateQuantity(id, selectedQuantity + 1)}
        />
      </TooltipWrapper>
    </div>
  );
};

export default AddToCart;
