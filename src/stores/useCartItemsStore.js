import { removeById, existsById, modifyById } from "neetocommons/pure";
import { append, assoc } from "ramda";
import { create } from "zustand";

// eslint-disable-next-line @bigbinary/neeto/ensure-zustand-stores-are-type-annotated, @bigbinary/neeto/zustand-use-with-immutable-actions-wrapper-inside-create
const useCartItemsStore = create(set => ({
  cartItems: [],
  updateQuantity: (product, quantity) =>
    set(({ cartItems }) => {
      if (existsById(product.id, cartItems)) {
        return {
          cartItems: modifyById(
            product.id,
            assoc("quantity", quantity),
            cartItems
          ),
        };
      }

      return { cartItems: append({ ...product, quantity }, cartItems) };
    }),
  removeCartItem: id =>
    set(({ cartItems }) => ({
      cartItems: removeById(id, cartItems),
    })),
}));

export default useCartItemsStore;
