import React from "react";

import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";

const AddToCart = ({ slug }) => {
  const { t } = useTranslation();
  const { cartItems, toggleCartPresence } = useCartItemsStore.pick();

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    toggleCartPresence(slug);
  };

  return (
    <Button
      size="large"
      label={
        cartItems.includes(slug)
          ? t("product.removeFromCart")
          : t("product.addToCart")
      }
      onClick={handleClick}
    />
  );
};

export default AddToCart;
