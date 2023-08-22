import React from "react";

import { Button } from "neetoui";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";

import useSelectedQuantity from "./hooks/useSelectedQuantity";
import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ slug, availableQuantity }) => {
  const { t } = useTranslation();

  const { selectedQuantity, updateSelectedQuantity } =
    useSelectedQuantity(slug);

  if (isNil(selectedQuantity)) {
    return (
      <Button
        label={t("product.addToCart")}
        size="large"
        onClick={e => {
          e.stopPropagation();
          updateSelectedQuantity(1);
        }}
      />
    );
  }

  return <ProductQuantity {...{ availableQuantity, slug }} />;
};

export default AddToCart;
