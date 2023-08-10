import React from "react";

import Carousel from "components/commons/Carousel";
import Header from "components/commons/Header";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import AddToCart from "./AddToCart";

const Product = ({
  slug,
  name,
  description,
  mrp,
  offerPrice,
  discountRate,
  availableQuantity,
  images,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Header title={name} />
      <hr className="neeto-ui-bg-black h-1" />
      <div className="mt-6 flex gap-6">
        <Carousel className="basis-2/5" {...{ images }} />
        <div className="basis-3/5 space-y-4">
          <Typography style="body1">{description}</Typography>
          <Typography style="body1">{t("product.mrp", { mrp })}</Typography>
          <Typography weight="bold">
            {t("product.offerPrice", { offerPrice })}
          </Typography>
          <Typography
            className="neeto-ui-text-success-800"
            style="body1"
            weight="extrabold"
          >
            {t("product.discountRate", { discountRate })}
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ availableQuantity, slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label={t("product.buyNow")}
              size="large"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
