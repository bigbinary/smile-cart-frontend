import React from "react";

import { Typography } from "neetoui";
import { values, prop } from "ramda";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";

const Header = ({ title, actionBlock }) => {
  const cartItemsCount = useCartItemsStore(
    store => values(prop("cartItems", store)).length
  );

  return (
    <>
      <div className="mx-6 mb-2 flex items-end justify-between">
        <Typography style="h1" weight="semibold">
          {title}
        </Typography>
        <div className="flex items-end space-x-4">
          {actionBlock}
          <div className="flex flex-col">
            {cartItemsCount > 0 && (
              <span className="neeto-ui-border-black neeto-ui-rounded-full min-w-fit flex h-5 w-5 items-center self-end border p-1">
                {cartItemsCount}
              </span>
            )}
            <Link to={routes.cart}>
              <AiOutlineShoppingCart className="cursor-pointer" size="2rem" />
            </Link>
          </div>
        </div>
      </div>
      <hr className="neeto-ui-bg-black h-1" />
    </>
  );
};

export default Header;
