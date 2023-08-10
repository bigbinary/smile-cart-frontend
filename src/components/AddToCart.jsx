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

  if (isNil(selectedQuantity)) {
    return (
      <Button
        className="bg-neutral-800 hover:bg-neutral-950"
        label={t("product.addToCart")}
        size="large"
        onClick={() => setSelectedQuantity(slug, 1)}
      />
    );
  }

  return <ProductQuantity {...{ availableQuantity, slug }} />;
};

export default AddToCart;
