import { isNotEmpty } from "neetocommons/pure";
import { assoc, dissoc, evolve } from "ramda";
import { create } from "zustand";

// eslint-disable-next-line @bigbinary/neeto/ensure-zustand-stores-are-type-annotated, @bigbinary/neeto/zustand-use-with-immutable-actions-wrapper-inside-create
const useCartItemsStore = create(set => ({
  cartItems: {},
  setSelectedQuantity: (slug, quantity) =>
    set(({ cartItems }) => {
      if (quantity <= 0 && isNotEmpty(quantity)) {
        return { cartItems: dissoc(slug, cartItems) };
      }

      return { cartItems: assoc(slug, String(quantity), cartItems) };
    }),
  removeCartItem: slug => set(evolve({ cartItems: dissoc(slug) })),
  clearCart: () => set({ cartItems: {} }),
}));

export default useCartItemsStore;
