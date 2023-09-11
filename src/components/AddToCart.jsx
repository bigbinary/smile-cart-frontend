import React from "react";

import { Button } from "neetoui";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";

import useSelectedQuantity from "./hooks/useSelectedQuantity";
import ProductQuantity from "./ProductQuantity";
import { DEFAULT_PAGE_INDEX } from "./ProductsList/constants";

const AddToCart = ({ slug, availableQuantity }) => {
  const { t } = useTranslation();

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedQuantity(DEFAULT_PAGE_INDEX);
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
