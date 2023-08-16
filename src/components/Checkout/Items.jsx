import React from "react";

import { Typography, Button, Tag } from "neetoui";
import { Trans, useTranslation } from "react-i18next";

const Items = ({ products, totalPrice, cartItems }) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col p-10">
      {products.map(({ images, name, slug, offerPrice }) => (
        <div className="mt-3 flex" key={slug}>
          <div className="relative">
            <div className="neeto-ui-rounded neeto-ui-border-gray-500 border">
              <img
                alt={name}
                className="neeto-ui-rounded"
                height="60px"
                src={images[0]}
                width="60px"
              />
            </div>
            <div className="absolute -right-2 -top-2">
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
        <Typography className="flex justify-between" style="h5">
          <Trans
            components={{ span: <span /> }}
            i18nKey="checkout.subtotal"
            values={{ totalPrice }}
          />
        </Typography>
        <Typography className="flex justify-between" style="h5">
          <Trans
            components={{ span: <span className="text-lime-700" /> }}
            i18nKey="checkout.deliveryCharges"
            values={{ totalPrice }}
          />
        </Typography>
        <div className="neeto-ui-border-black border-t border-dashed" />
        <Typography className="flex justify-between">
          <Trans
            components={{ span: <span /> }}
            i18nKey="checkout.totalPrice"
            values={{ totalPrice }}
          />
        </Typography>
      </div>
      <div className="mt-auto flex justify-center">
        <Button
          className="w-1/3 justify-center bg-neutral-800"
          label={t("checkout.confirmOrder")}
          type="submit"
        />
      </div>
    </div>
  );
};

export default Items;
