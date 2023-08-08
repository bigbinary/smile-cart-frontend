import React, { useEffect, useState } from "react";

import { findById } from "neetocommons/pure";
import { Button, Input } from "neetoui";
import useCartItemsStore from "stores/useCartItemsStore";

import TooltipWrapper from "./commons/TooltipWrapper";

const AddToCart = ({ product }) => {
  const { id, availableQuantity } = product;

  const { cartItems, updateQuantity } = useCartItemsStore.pick();

  const cartItemsCount = findById(id, cartItems)?.quantity ?? 0;

  const [selectedQuantity, setSelectedQuantity] = useState(cartItemsCount);
  const [inputValue, setInputValue] = useState(cartItemsCount);

  useEffect(() => {
    if (selectedQuantity > 0) {
      updateQuantity(product, selectedQuantity);
    }
  }, [id, selectedQuantity]);

  const handleInputSubmit = e => {
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue) || newValue < 0) {
      newValue = 0;
    } else if (newValue > availableQuantity) {
      newValue = availableQuantity;
    }

    setInputValue(newValue);
    setSelectedQuantity(newValue);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleInputSubmit(e);
    }
  };

  if (selectedQuantity === 0 && inputValue === 0) {
    return (
      <Button
        className="bg-neutral-800 hover:bg-neutral-950"
        label="Add to cart"
        size="large"
        onClick={() => {
          setSelectedQuantity(1);
          setInputValue(1);
        }}
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
        onClick={() => {
          setSelectedQuantity(prevQuantity => prevQuantity - 1);
          setInputValue(prevQuantity => prevQuantity - 1);
        }}
      />
      <Input
        nakedInput
        contentSize="2"
        value={inputValue}
        onBlur={handleInputSubmit}
        onChange={e => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
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
          onClick={() => {
            setSelectedQuantity(prevQuantity => prevQuantity + 1);
            setInputValue(prevQuantity => prevQuantity + 1);
          }}
        />
      </TooltipWrapper>
    </div>
  );
};

export default AddToCart;
