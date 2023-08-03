import { existsById, modifyById } from "@bigbinary/neeto-commons-frontend/pure";
// import { withImmutableActions } from "@bigbinary/neeto-commons-frontend/react-utils";
import { append, assoc } from "ramda";
import { create } from "zustand";

/** @type {import("neetocommons/react-utils").ZustandStoreHook} */
// eslint-disable-next-line @bigbinary/neeto/zustand-use-with-immutable-actions-wrapper-inside-create
const useCartItemsStore = create(set => ({
  cartItems: [{ id: 1, quantity: 10 }],
  updateQuantity: (id, quantity) =>
    set(state => {
      if (existsById(id, state.cartItems)) {
        return {
          cartItems: modifyById(
            id,
            assoc("quantity", quantity),
            state.cartItems
          ),
        };
      }

      return { cartItems: append({ id, quantity }, state.cartItems) };
    }),
}));

export default useCartItemsStore;
