import React from "react";

import ProductQuantity from "components/ProductQuantity";
import { Delete } from "neetoicons";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";

const ProductCard = ({
  slug,
  images,
  offerPrice,
  mrp,
  name,
  availableQuantity,
}) => {
  const { t } = useTranslation();

  const { removeCartItem } = useCartItemsStore.pick();

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black border p-2">
      <div className="flex w-full items-center">
        <img alt={name} height="100px" src={images[0]} width="100px" />
        <div className="flex-grow space-y-1">
          <Typography className="mb-2" style="h3" weight="bold">
            {name}
          </Typography>
          <Typography style="body2">{t("product.mrp", { mrp })}</Typography>
          <Typography style="body2">
            {t("product.offerPrice", { offerPrice })}
          </Typography>
        </div>
        <div className="flex items-center space-x-2">
          <ProductQuantity {...{ availableQuantity, slug }} />
          <Delete
            className="cursor-pointer"
            onClick={() => removeCartItem(slug)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
