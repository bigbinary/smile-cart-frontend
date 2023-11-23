import React from "react";

import AddToCart from "components/AddToCart";
import { Header, PageNotFound, PageLoader } from "components/commons";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import i18n from "i18next";
import { Button, Typography } from "neetoui";
import { isNotNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import routes from "routes";
import withTitle from "utils/withTitle";

import Carousel from "./Carousel";

const Product = () => {
  const { t } = useTranslation();

  const { slug } = useParams();

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

  const {
    name,
    description,
    mrp,
    offerPrice,
    availableQuantity,
    imageUrl,
    imageUrls,
  } = product;

  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);
  if (isLoading) return <PageLoader />;

  if (isError) return <PageNotFound />;

  return (
    <>
      <Header title={name} />
      <div className="m-16 flex justify-center gap-16">
        {isNotNil(imageUrls) ? (
          <Carousel />
        ) : (
          <img alt={name} className="w-48" src={imageUrl} />
        )}
        <div className="w-3/5 space-y-4">
          <Typography style="body1">{description}</Typography>
          <Typography style="body1">{t("mrp", { mrp })}</Typography>
          <Typography weight="bold">
            {t("offerPrice", { offerPrice })}
          </Typography>
          <Typography
            className="neeto-ui-text-success-800"
            style="body1"
            weight="extrabold"
          >
            {t("discountRate", { discountPercentage })}
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ availableQuantity, slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label={t("buyNow")}
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

export default withTitle(Product, i18n.t("product"));
