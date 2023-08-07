import React from "react";

import { Button, Input } from "neetoui";
import { isEmpty, isNil, paths } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

import TooltipWrapper from "./commons/TooltipWrapper";

const AddToCart = ({ id, availableQuantity }) => {
  const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
    paths([["cartItems", id], ["setSelectedQuantity"]]),
    shallow
  );

  if (isNil(selectedQuantity) || isEmpty(selectedQuantity)) {
    return (
      <Button
        className="bg-neutral-800 hover:bg-neutral-950"
        label="Add to cart"
        size="large"
        onClick={() => setSelectedQuantity(id, 1)}
      />
    );
  }

  return (
    <div className="neeto-ui-border-black flex items-center border">
      <Button
        className="focus-within:ring-0 hover:bg-transparent"
        label="-"
        style="text"
        onClick={() => setSelectedQuantity(id, selectedQuantity - 1)}
      />
      <Input nakedInput contentSize="2" value={selectedQuantity} />
      <TooltipWrapper
        showTooltip={selectedQuantity >= availableQuantity}
        tooltipProps={{ content: "Out of stock.", position: "top" }}
      >
        <Button
          className="focus-within:ring-0 hover:bg-transparent"
          disabled={selectedQuantity >= availableQuantity}
          label="+"
          style="text"
          onClick={() => setSelectedQuantity(id, selectedQuantity + 1)}
        />
      </TooltipWrapper>
    </div>
  );
};

export default AddToCart;
