import React from "react";

import { Button } from "neetoui";
import { isNil, paths } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ slug, availableQuantity }) => {
  const { t } = useTranslation();

  const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
    paths([["cartItems", slug], ["setSelectedQuantity"]]),
    shallow
  );

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedQuantity(slug, 1);
  };

  if (isNil(selectedQuantity)) {
    return (
      <Button
        label={t("product.addToCart")}
        size="large"
        onClick={handleClick}
      />
    );
  }

  return <ProductQuantity {...{ availableQuantity, slug }} />;
};

export default AddToCart;
