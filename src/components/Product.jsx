import React from "react";

import { useShowProductBySlug } from "hooks/reactQuery/useProductsApi";
import { Button, Typography } from "neetoui";
import { isNil, paths } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

import AddToCart from "./AddToCart";
import { Carousel, Header, PageNotFound, PageLoader } from "./commons";
import { SINGLE_QUANTITY } from "./constants";

const Product = () => {
  const { t } = useTranslation();

  const { slug } = useParams();

  const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
    paths([["cartItems", slug], ["setSelectedQuantity"]]),
    shallow
  );
  const { data: product = [], isLoading } = useShowProductBySlug(slug);

  const {
    name,
    imageUrl,
    images,
    description,
    mrp,
    offerPrice,
    discountRate,
    availableQuantity,
  } = product;

  if (isLoading) return <PageLoader />;

  if (isNil(product)) return <PageNotFound />;

  return (
    <>
      <Header title={name} />
      <div className="mt-6 flex gap-6">
        <Carousel className="basis-2/5" images={[imageUrl, ...images]} />
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
              to={routes.checkout}
              onClick={() =>
                setSelectedQuantity(slug, selectedQuantity || SINGLE_QUANTITY)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
