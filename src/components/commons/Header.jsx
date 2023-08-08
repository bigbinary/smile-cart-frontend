import React from "react";

import { isNotEmpty, filterBy } from "neetocommons/pure";
import { Typography } from "neetoui";
import { gt, __, prop } from "ramda";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import useCartItemsStore from "stores/useCartItemsStore";

import routes from "../../routes";

const Header = ({ title }) => {
  const cartItems = useCartItemsStore(prop("cartItems"));

  const history = useHistory();

  return (
    <div className="mx-6 mb-2 flex justify-between">
      <Typography style="h1">{title}</Typography>
      <div className="flex flex-col">
        {isNotEmpty(cartItems) && (
          <span className="neeto-ui-border-black neeto-ui-rounded-full flex h-5 w-5 min-w-fit items-center self-end border p-1">
            {filterBy({ quantity: gt(__, 0) }, cartItems).length}
          </span>
        )}
        <AiOutlineShoppingCart
          className="cursor-pointer"
          size="2rem"
          onClick={() => history.push(routes.cart)}
        />
      </div>
    </div>
  );
};

export default Header;
