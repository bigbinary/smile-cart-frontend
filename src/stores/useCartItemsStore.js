import { without } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartItemsStore = create(
  persist(
    set => ({
      cartItems: [],
      toggleCartPresence: slug =>
        set(({ cartItems }) => {
          if (cartItems.includes(slug)) {
            return { cartItems: without([slug], cartItems) };
          }

          return { cartItems: [slug, ...cartItems] };
        }),
    }),
    { name: "cart-items-store" }
  )
);

export default useCartItemsStore;
