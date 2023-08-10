import React from "react";

import { useShowProductBySlug } from "hooks/reactQuery/useProductsApi";
import { Button, Typography } from "neetoui";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import AddToCart from "./AddToCart";
import { Carousel, Header, PageNotFound } from "./commons";

const Product = () => {
  const { slug } = useParams();

  const { data: product } = useShowProductBySlug(slug);

  const { t } = useTranslation();

  if (isNil(product)) return <PageNotFound />;

  return (
    <>
      <Header title={product?.name} />
      <hr className="neeto-ui-bg-black h-1" />
      <div className="mt-6 flex gap-6">
        <Carousel className="basis-2/5" images={product?.images} />
        <div className="basis-3/5 space-y-4">
          <Typography style="body1">{product?.description}</Typography>
          <Typography style="body1">
            {t("product.mrp", { mrp: product?.mrp })}
          </Typography>
          <Typography weight="bold">
            {t("product.offerPrice", { offerPrice: product?.offerPrice })}
          </Typography>
          <Typography
            className="neeto-ui-text-success-800"
            style="body1"
            weight="extrabold"
          >
            {t("product.discountRate", { discountRate: product?.discountRate })}
          </Typography>
          <div className="flex space-x-10">
            <AddToCart
              availableQuantity={product?.availableQuantity}
              id={product?.id}
            />
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
