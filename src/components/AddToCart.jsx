import React from "react";

import { Button } from "neetoui";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";

import useSelectedQuantity from "./hooks/useSelectedQuantity";
import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ slug, availableQuantity }) => {
  const { t } = useTranslation();

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedQuantity(1);
  };

  if (isNil(selectedQuantity)) {
    return <Button label={t("addToCart")} size="large" onClick={handleClick} />;
  }

  return <ProductQuantity {...{ availableQuantity, slug }} />;
};

export default AddToCart;
