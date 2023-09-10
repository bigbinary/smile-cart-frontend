import React, { useMemo } from "react";

import { cartTotalOf } from "components/utils";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import { Button } from "neetoui";
import { keys } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";

import PriceEntry from "./PriceEntry";
import Product from "./Product";

const Items = ({ isSubmitDisabled }) => {
  const { t } = useTranslation();

  const { cartItems } = useCartItemsStore.pick();

  const { data: products = [] } = useFetchCartProducts(keys(cartItems));

  const totalCheckoutPrice = useMemo(
    () => cartTotalOf(products, "offerPrice"),
    [products]
  );

  return (
    <div className="flex h-full flex-col p-10">
      {products.map(product => (
        <Product
          key={product.slug}
          {...product}
          selectedQuantity={cartItems[product.slug]}
        />
      ))}
      <div className="mt-5 w-3/4 space-y-3">
        <PriceEntry
          i18nKey="checkout.subtotal"
          totalPrice={totalCheckoutPrice}
        />
        <PriceEntry
          className="text-green-700"
          i18nKey="checkout.deliveryCharges"
        />
        <div className="neeto-ui-border-black border-t border-dashed" />
        <PriceEntry
          i18nKey="checkout.totalPrice"
          totalPrice={totalCheckoutPrice}
        />
      </div>
      <div className="mt-auto flex justify-center">
        <Button
          className="bg-neutral-800 w-1/3 justify-center"
          disabled={isSubmitDisabled}
          label={t("checkout.confirmOrder")}
          type="submit"
        />
      </div>
    </div>
  );
};

export default Items;
