import AddToCart from "components/AddToCart";
import { Header, PageLoader, PageNotFound } from "components/commons";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import i18n from "i18next";
import { Typography } from "neetoui";
import { isNotNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import withTitle from "utils/withTitle";

import Carousel from "./Carousel";

const Product = () => {
  const { t } = useTranslation();

  const { slug } = useParams();

  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

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
              <Carousel />
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
export default withTitle(Product, i18n.t("product"));
