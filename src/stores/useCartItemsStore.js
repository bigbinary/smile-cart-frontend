import { assoc, dissoc } from "ramda";
import { create } from "zustand";

// eslint-disable-next-line @bigbinary/neeto/ensure-zustand-stores-are-type-annotated, @bigbinary/neeto/zustand-use-with-immutable-actions-wrapper-inside-create
const useCartItemsStore = create(set => ({
  cartItems: {},
  updateQuantity: (id, quantity) =>
    set(state => {
      if (quantity === 0) return { cartItems: dissoc(id, state.cartItems) };

      return { cartItems: assoc(id, quantity, state.cartItems) };
    }),
}));

export default useCartItemsStore;
