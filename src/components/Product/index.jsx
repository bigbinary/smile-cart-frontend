import { useState, useEffect } from "react";

import productsApi from "apis/products";
import AddToCart from "components/AddToCart";
import { Header, PageLoader, PageNotFound } from "components/commons";
import { Typography } from "neetoui";
import { append, isNotNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState({});

  const { t } = useTranslation();

  const { slug } = useParams();

  const fetchProduct = async () => {
    try {
      const response = await productsApi.show(slug);
      setProduct(response);
    } catch (error) {
      setIsError(true);
      // eslint-disable-next-line no-console
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
          <AddToCart {...{ availableQuantity, slug }} />
        </div>
      </div>
    </>
  );
};
export default Product;
