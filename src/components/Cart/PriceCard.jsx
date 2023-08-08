import React from "react";

import classNames from "classnames";
import { Typography, Button } from "neetoui";
import { gt } from "ramda";

const PriceCard = ({ totalMrp, offerPrice }) => {
  const totalDiscounts = totalMrp - offerPrice;
  const isDiscountPresent = gt(totalDiscounts, 0);
  const discountPercentage = ((totalDiscounts / totalMrp) * 100).toFixed(1);

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black w-1/4 flex-none space-y-2 border p-3">
      <Typography
        className={classNames("flex justify-between", {
          "line-through": isDiscountPresent,
        })}
      >
        Total MRP <span> ${totalMrp}</span>
      </Typography>
      {isDiscountPresent && (
        <>
          <Typography className="flex justify-between text-lime-700">
            Total discounts:
            <span>
              ${totalDiscounts} ({discountPercentage}%)
            </span>
          </Typography>
          <Typography className="flex justify-between">
            Total offer price: <span>${offerPrice}</span>
          </Typography>
        </>
      )}
      <div className="flex flex-col items-center pt-4">
        <Button className="bg-neutral-800" label="Buy now" />
      </div>
    </div>
  );
};
export default PriceCard;
