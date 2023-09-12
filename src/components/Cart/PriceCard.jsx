import React, { memo } from "react";

import classNames from "classnames";
import { Typography, Button } from "neetoui";
import { gt } from "ramda";
import { useTranslation, Trans } from "react-i18next";
import routes from "routes";

const PriceCard = ({ totalMrp, totalOfferPrice }) => {
  const { t } = useTranslation();

  const totalDiscounts = totalMrp - totalOfferPrice;
  const isDiscountPresent = gt(totalDiscounts, 0);
  const discountPercentage = ((totalDiscounts / totalMrp) * 100).toFixed(1);

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black space-y-2 border p-3">
      <Typography
        className={classNames("flex justify-between", {
          "line-through": isDiscountPresent,
        })}
      >
        <Trans
          components={{ span: <span /> }}
          i18nKey="cart.totalMrp"
          values={{ mrp: totalMrp }}
        />
      </Typography>
      {isDiscountPresent && (
        <>
          <Typography className="flex justify-between text-green-700">
            <Trans
              components={{ span: <span /> }}
              i18nKey="cart.totalDiscounts"
              values={{ discounts: totalDiscounts, discountPercentage }}
            />
          </Typography>
          <Typography className="flex justify-between">
            <Trans
              components={{ span: <span /> }}
              i18nKey="cart.offerPrice"
              values={{ offerPrice: totalOfferPrice }}
            />
          </Typography>
        </>
      )}
      <div className="flex flex-col items-center pt-4">
        <Button
          className="bg-neutral-800"
          label={t("product.buyNow")}
          to={routes.checkout}
        />
      </div>
    </div>
  );
};
export default memo(PriceCard);
