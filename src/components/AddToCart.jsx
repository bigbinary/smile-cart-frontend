import React, { useContext } from "react";

import CartItemsContext from "contexts/CartItemsContext";
import { Button } from "neetoui";
import { without } from "ramda";
import { useTranslation } from "react-i18next";

const AddToCart = ({ slug }) => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useContext(CartItemsContext);

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    setCartItems(prevCartItems => {
      if (prevCartItems.includes(slug)) {
        return without([slug], cartItems);
      }

      return [slug, ...cartItems];
    });
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
