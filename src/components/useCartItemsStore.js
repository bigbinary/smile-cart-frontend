import { modifyById } from "@bigbinary/neeto-commons-frontend/pure";
// import { withImmutableActions } from "@bigbinary/neeto-commons-frontend/react-utils";
import { assoc } from "ramda";
import { create } from "zustand";

/** @type {import("neetocommons/react-utils").ZustandStoreHook} */
// eslint-disable-next-line @bigbinary/neeto/zustand-use-with-immutable-actions-wrapper-inside-create
const useCartItemsStore = create(set => ({
  cartItems: [],
  updateQuantity: (id, quantity) =>
    set(state => ({
      cartItems: modifyById(id, assoc("quantity", quantity), state.cartItems),
    })),
}));

export default useCartItemsStore;
