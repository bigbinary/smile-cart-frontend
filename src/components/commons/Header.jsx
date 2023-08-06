import React from "react";

import { isNotEmpty, filterBy } from "neetocommons/pure";
import { Typography } from "neetoui";
import { gt, __, prop } from "ramda";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useCartItemsStore from "stores/useCartItemsStore";

const Header = ({ title, actionBlock }) => {
  const cartItems = useCartItemsStore(prop("cartItems"));

  return (
    <>
      <div className="mx-6 mb-2 flex justify-between">
        <Typography style="h1">{title}</Typography>
        <div className="flex items-baseline space-x-4">
          {actionBlock}
          <div className="flex flex-col">
            {isNotEmpty(cartItems) && (
              <span className="neeto-ui-border-black neeto-ui-rounded-full flex h-5 w-5 min-w-fit items-center self-end border p-1">
                {filterBy({ quantity: gt(__, 0) }, cartItems).length}
              </span>
            )}
            <AiOutlineShoppingCart size="2rem" />
          </div>
        </div>
      </div>
      <hr className="neeto-ui-bg-black h-1" />
    </>
  );
};

export default Header;
