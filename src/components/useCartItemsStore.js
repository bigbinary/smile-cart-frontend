import { existsById, modifyById } from "neetocommons/pure";
import { append, assoc } from "ramda";
import { create } from "zustand";

// eslint-disable-next-line @bigbinary/neeto/ensure-zustand-stores-are-type-annotated, @bigbinary/neeto/zustand-use-with-immutable-actions-wrapper-inside-create
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
