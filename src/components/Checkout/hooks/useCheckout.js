import { useState } from "react";

import {
  useFetchCountries,
  useFetchStates,
} from "hooks/reactQuery/useCheckoutApi";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import { keys } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";

import { CHECKOUT_FORM_INITIAL_VALUES } from "../constants";

const useCheckout = ({ country }) => {
  const [selectedCountry, setSelectedCountry] = useState(
    country || CHECKOUT_FORM_INITIAL_VALUES.country
  );

  const history = useHistory();

  const { clearCart, cartItems } = useCartItemsStore.pick();

  const { data: { data: countries } = [], isFetching: isLoadingCountries } =
    useFetchCountries();

  const { data: { states } = [] } = useFetchStates({
    selectedCountry,
  });

  const { data: products = [], isLoading: isLoadingProducts } =
    useFetchCartProducts(keys(cartItems));

  const isLoading = isLoadingProducts || isLoadingCountries;

  const redirectToHome = () =>
    setTimeout(() => {
      history.push(routes.root);
      clearCart();
    }, 1500);

  return {
    countries,
    states,
    products,
    isLoading,
    setSelectedCountry,
    redirectToHome,
  };
};
export default useCheckout;
