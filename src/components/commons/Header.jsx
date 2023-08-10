import React from "react";

import { Typography } from "neetoui";
import { values, prop } from "ramda";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useCartItemsStore from "stores/useCartItemsStore";

const Header = ({ title }) => {
  const cartItemsCount = useCartItemsStore(
    store => values(prop("cartItems", store)).length
  );

  return (
    <div className="mx-6 mb-2 flex justify-between">
      <Typography style="h1">{title}</Typography>
      <div className="flex flex-col">
        {cartItemsCount > 0 && (
          <span className="neeto-ui-border-black neeto-ui-rounded-full flex h-5 w-5 min-w-fit items-center self-end border p-1">
            {cartItemsCount}
          </span>
        )}
        <AiOutlineShoppingCart size="2rem" />
      </div>
    </div>
  );
};

export default Header;
