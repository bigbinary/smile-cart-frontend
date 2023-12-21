import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { PageLoader, Header } from "components/commons";
import { cartTotalOf } from "components/utils";
import i18n from "i18next";
import { NoData, Toastr } from "neetoui";
import { isEmpty, keys } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";
import withTitle from "utils/withTitle";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

import { MRP, OFFER_PRICE } from "../constants";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();

  const { cartItems, setSelectedQuantity } = useCartItemsStore.pick();

  const slugs = keys(cartItems);

  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);

  const fetchCartProducts = async () => {
    try {
      const responses = await Promise.all(
        slugs.map(slug => productsApi.show(slug))
      );

      setProducts(responses);
      responses.forEach(({ availableQuantity, name, slug }) => {
        if (availableQuantity >= cartItems[slug]) return;

        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(t("error.removedFromCart", { name }), {
            autoClose: 2000,
          });
        }
      });
    } catch (error) {
      console.log(t("error.genericError", { error }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [cartItems]);

  if (isLoading) return <PageLoader />;

  if (isEmpty(products)) {
    return (
      <>
        <Header title={t("cart.title")} />
        <div className="flex h-screen items-center justify-center">
          <NoData title={t("cart.empty")} />
        </div>
      </>
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

export default withTitle(Cart, i18n.t("cart.title"));
