import React from "react";

import { Button } from "neetoui";
import { isNil, paths } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ id, availableQuantity }) => {
  const { t } = useTranslation();

  const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
    paths([["cartItems", id], ["setSelectedQuantity"]]),
    shallow
  );

  if (isNil(selectedQuantity)) {
    return (
      <Button
        className="bg-neutral-800 hover:bg-neutral-950"
        label={t("product.addToCart")}
        size="large"
        onClick={() => setSelectedQuantity(id, 1)}
      />
    );
  }

  return <ProductQuantity {...{ availableQuantity, id }} />;
};

export default AddToCart;
