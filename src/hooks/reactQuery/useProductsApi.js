import { DEFAULT_STALE_TIME, QUERY_KEYS } from "constants/query";

import productsApi from "apis/products";
import { Toastr } from "neetoui";
import { prop } from "ramda";
import { useTranslation } from "react-i18next";
import { useQuery, useQueries } from "react-query";
import useCartItemsStore from "stores/useCartItemsStore";

export const useFetchCartProducts = slugs => {
  const { cartItems, setSelectedQuantity } = useCartItemsStore.pick();
  const { t } = useTranslation();

  const responses = useQueries(
    slugs.map(slug => ({
      queryKey: [QUERY_KEYS.PRODUCTS, slug],
      queryFn: () => productsApi.show(slug),
      onSuccess: ({ availableQuantity, name }) => {
        if (availableQuantity >= cartItems[slug]) return;
        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(t("product.error.removedFromCart", { name }), {
            autoClose: 2000,
          });
        }
      },
      staleTime: DEFAULT_STALE_TIME,
    }))
  );

  const isLoading = responses.some(prop("isLoading"));
  const data = responses.map(prop("data")).filter(Boolean);

  return { isLoading, data };
};

export const useFetchProducts = params =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productsApi.fetch(params),
    keepPreviousData: true,
    staleTime: DEFAULT_STALE_TIME,
  });

export const useShowProduct = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slug],
    queryFn: () => productsApi.show(slug),
    staleTime: DEFAULT_STALE_TIME,
  });
