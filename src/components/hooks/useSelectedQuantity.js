import { paths } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

const useSelectedQuantity = ({ slug }) => {
  const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
    paths([["cartItems", slug], ["setSelectedQuantity"]]),
    shallow
  );

  return { selectedQuantity, setSelectedQuantity };
};
export default useSelectedQuantity;
