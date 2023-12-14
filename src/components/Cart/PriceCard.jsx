import classNames from "classnames";
import { Typography, Button } from "neetoui";
import { gt, keys } from "ramda";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";

const PriceCard = ({ totalMrp, totalOfferPrice }) => {
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
        Total MRP: <span>${totalMrp}</span>
      </Typography>
      {isDiscountPresent && (
        <>
          <Typography className="flex justify-between text-green-700">
            Total discounts:{" "}
            <span>
              ${totalDiscounts} ({discountPercentage}%)
            </span>
          </Typography>
          <Typography className="flex justify-between">
            Total offer price: <span>${totalOfferPrice}</span>
          </Typography>
          <span className="neeto-ui-text-gray-500 text-sm">
            {itemsCount} item(s)
          </span>
        </>
      )}
      <div className="flex flex-col items-center pt-4">
        <Button
          className="bg-neutral-800"
          label="Buy now"
          to={routes.checkout}
        />
      </div>
    </div>
  );
};
export default PriceCard;
