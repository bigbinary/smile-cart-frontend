import React, { useMemo } from "react";

import Header from "components/commons/Header";
import PageLoader from "components/commons/PageLoader";
import { cartTotalOf } from "components/utils";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import { NoData } from "neetoui";
import { isEmpty, keys, prop } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

const Cart = () => {
  const { t } = useTranslation();

  const slugs = useCartItemsStore(store => keys(prop("cartItems", store)));

  const { data: products = [], isLoading } = useFetchCartProducts(slugs);

  const totalMrp = useMemo(() => cartTotalOf(products, "mrp"), [products]);
  const totalOfferPrice = useMemo(
    () => cartTotalOf(products, "offerPrice"),
    [products]
  );

  if (isLoading) return <PageLoader />;

  if (isEmpty(products)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <NoData title={t("cart.empty")} />
      </div>
    );
  }

  return (
    <>
      <Header title={t("cart.title")} />
      <div className="mt-10 flex justify-center space-x-10">
        <div className="w-1/3 space-y-5">
          {products.map(product => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
        {totalMrp > 0 && (
          <div className="w-1/4">
            <PriceCard {...{ totalMrp, totalOfferPrice }} />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
