import React, { useState } from "react";

import { Button } from "neetoui";
import { useTranslation } from "react-i18next";

const AddToCart = () => {
  const { t } = useTranslation();
  const [isInCart, setIsInCart] = useState(false);

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    setIsInCart(prevValue => !prevValue);
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
