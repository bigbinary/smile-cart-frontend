import classNames from "classnames";
import { Typography, Button } from "neetoui";
import { gt, keys } from "ramda";
import { useTranslation, Trans } from "react-i18next";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";

const PriceCard = ({ totalMrp, totalOfferPrice }) => {
  const { t } = useTranslation();

  const totalDiscounts = totalMrp - totalOfferPrice;
  const isDiscountPresent = gt(totalDiscounts, 0);
  const discountPercentage = ((totalDiscounts / totalMrp) * 100).toFixed(1);

  const itemsCount = useCartItemsStore(store => keys(store.cartItems).length);

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black space-y-2 border p-3">
      <Typography
        className={classNames("flex justify-between", {
          "line-through": isDiscountPresent,
        })}
      >
        <Trans
          components={{ typography: <span /> }}
          i18nKey="totalMrp"
          values={{ mrp: totalMrp }}
        />
      </Typography>
      {isDiscountPresent && (
        <>
          <Typography className="flex justify-between text-green-700">
            <Trans
              components={{ span: <span /> }}
              i18nKey="totalDiscounts"
              values={{ discounts: totalDiscounts, discountPercentage }}
            />
          </Typography>
          <Typography className="flex justify-between">
            <Trans
              components={{ span: <span /> }}
              i18nKey="totalOfferPrice"
              values={{ offerPrice: totalOfferPrice }}
            />
          </Typography>
          <span className="neeto-ui-text-gray-500 text-sm">
            {t("itemCount", { count: itemsCount })}
          </span>
        </>
      )}
      <div className="flex flex-col items-center pt-4">
        <Button
          className="bg-neutral-800"
          label={t("buyNow")}
          to={routes.checkout}
        />
      </div>
    </div>
  );
};
export default PriceCard;
