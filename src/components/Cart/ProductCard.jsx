import React, { useState, useRef, useEffect } from "react";

import { isNotEmpty } from "neetocommons/pure";
import { Delete } from "neetoicons";
import { Typography, Input, Button, Toastr } from "neetoui";
import { equals, isEmpty, gt } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";

const ProductCard = ({
  id,
  images,
  offerPrice,
  mrp,
  quantity,
  name,
  availableQuantity,
}) => {
  const [productCount, setProductCount] = useState(quantity);

  const countInputFocus = useRef(null);

  const { updateQuantity, removeCartItem } = useCartItemsStore.pick();

  const handleSetCount = event => {
    const {
      target: { value },
    } = event;

    const currentCount = parseInt(value);
    const isNotValidProductCount = gt(currentCount, availableQuantity);

    if (isNotValidProductCount) {
      Toastr.error(
        `We are sorry only ${availableQuantity} units are available`
      );
      setProductCount(availableQuantity);
      countInputFocus.current.blur();
    } else if (!isNaN(value)) {
      setProductCount(currentCount || "");
    }
  };

  useEffect(() => {
    isNotEmpty(productCount) && updateQuantity({ id }, productCount);
  }, [productCount]);

  return (
    <div
      className="neeto-ui-rounded neeto-ui-border-black h-1/2 w-1/3 border p-2"
      key={id}
    >
      <div className="flex w-full items-center">
        <img alt={name} height="100px" src={images[0]} width="100px" />
        <div className="flex-grow space-y-1">
          <Typography className="mb-2" style="h3" weight="bold">
            {name}
          </Typography>
          <Typography style="body2">MRP: ${mrp}</Typography>
          <Typography style="body2">Offer price: ${offerPrice}</Typography>
        </div>
        <div className="neeto-ui-border-black neeto-ui-rounded mr-3 flex w-1/5 items-center border">
          <Button
            className="focus-within:ring-0"
            disabled={equals(productCount, 1) || isEmpty(productCount)}
            label="-"
            style="text"
            onClick={() => setProductCount(prevCount => prevCount - 1)}
          />
          <Input
            nakedInput
            className="pl-1.5"
            ref={countInputFocus}
            value={productCount}
            onChange={handleSetCount}
          />
          <Button
            className="focus-within:ring-0"
            disabled={equals(productCount, availableQuantity)}
            label="+"
            style="text"
            onClick={() =>
              setProductCount(prevCount => parseInt(prevCount + 1))
            }
          />
        </div>
        <Delete className="cursor-pointer" onClick={() => removeCartItem(id)} />
      </div>
    </div>
  );
};

export default ProductCard;
