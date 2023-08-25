import React from "react";

import AddToCart from "components/AddToCart";
import { Header, PageNotFound, PageLoader } from "components/commons";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { useFetchProduct } from "hooks/reactQuery/useProductsApi";
import { Button, Typography } from "neetoui";
import { isNil, isNotNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import routes from "routes";

import Carousel from "./Carousel";

const Product = () => {
  const { t } = useTranslation();

  const { slug } = useParams();

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const { data: { data: product = [] } = {}, isLoading } =
    useFetchProduct(slug);

  const {
    name,
    imageUrl,
    imageUrls,
    description,
    mrp,
    offerPrice,
    availableQuantity,
  } = product;

  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  if (isLoading) return <PageLoader />;

  if (isNil(product)) return <PageNotFound />;

  return (
    <>
      <Header title={name} />
      <div className="m-16 flex justify-center gap-16">
        {isNotNil(imageUrls) ? (
          <Carousel className="w-2/5" />
        ) : (
          <img alt={name} height="200px" src={imageUrl} width="200px" />
        )}
        <div className="w-3/5 space-y-4">
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
            {t("product.discountRate", { discountPercentage })}
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ availableQuantity, slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label={t("product.buyNow")}
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
