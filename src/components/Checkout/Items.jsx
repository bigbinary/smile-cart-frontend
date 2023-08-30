import React from "react";

import { OFFER_PRICE } from "components/constants";
import { cartTotalOf } from "components/utils";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import { Typography, Button, Tag } from "neetoui";
import { keys } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";

import PriceEntry from "./PriceEntry";

const Items = ({ isSubmitLoading }) => {
  const { t } = useTranslation();

  const { cartItems } = useCartItemsStore.pick();

  const { data: products } = useFetchCartProducts(keys(cartItems));

  const totalCheckoutPrice = cartTotalOf(products, OFFER_PRICE);

  return (
    <div className="flex h-full flex-col p-10">
      {products.map(({ imageUrl, name, slug, offerPrice }) => (
        <div className="mt-3 flex" key={slug}>
          <div className="neeto-ui-rounded neeto-ui-border-gray-500 relative border">
            <img
              alt={name}
              className="neeto-ui-rounded"
              height="60px"
              src={imageUrl}
              width="60px"
            />
            <div className="absolute right-0 top-0 -mr-2 -mt-2">
              <Tag className="w-2" label={cartItems[slug]} type="solid" />
            </div>
          </div>
          <div className="m-5 flex w-1/2 justify-between">
            <Typography style="h5" weight="semibold">
              {name}
            </Typography>
            <Typography style="h5">${offerPrice}</Typography>
          </div>
        </div>
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
          disabled={isSubmitLoading}
          label={t("checkout.confirmOrder")}
          type="submit"
        />
      </div>
    </div>
  );
};

export default Items;
