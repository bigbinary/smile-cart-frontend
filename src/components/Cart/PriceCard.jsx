import classNames from "classnames";
import { Typography, Button } from "neetoui";
import { gt } from "ramda";
import routes from "routes";

const PriceCard = ({ totalMrp, totalOfferPrice, itemsCount }) => {
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
