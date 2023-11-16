import React from "react";

import { Button } from "neetoui";
import { useTranslation } from "react-i18next";

const AddToCart = ({ isInCart, toggleCartPresence }) => {
  const { t } = useTranslation();

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    toggleCartPresence();
  };

  return (
    <Button
      label={isInCart ? t("product.removeFromCart") : t("product.addToCart")}
      size="large"
      onClick={handleClick}
    />
  );
};

export default AddToCart;
