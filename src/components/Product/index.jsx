import { useState, useEffect } from "react";

import productsApi from "apis/products";
import {
  Header,
  PageLoader,
  PageNotFound,
  AddToCart,
} from "components/commons";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import i18n from "i18next";
import { Typography, Button } from "neetoui";
import { append, isNotNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import routes from "routes";
import withTitle from "utils/withTitle";

import Carousel from "./Carousel";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState({});

  const { t } = useTranslation();

  const { slug } = useParams();

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const fetchProduct = async () => {
    try {
      const response = await productsApi.show(slug);
      setProduct(response);
    } catch (error) {
      setIsError(true);
      console.log(t("error.genericError", { error }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrls,
    imageUrl,
    availableQuantity,
  } = product;

  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) return <PageNotFound />;

  return (
    <>
      <Header title={name} />
      <div className="mt-16 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>{t("mrp", { mrp })}</Typography>
          <Typography className="font-semibold">
            {t("offerPrice", { offerPrice })}
          </Typography>
          <Typography className="font-semibold text-green-600">
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
