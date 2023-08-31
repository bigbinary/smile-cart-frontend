import { DEFAULT_STALE_TIME, QUERY_KEYS } from "constants/query";

import productsApi from "apis/products";
import { prop } from "ramda";
import { useQuery, useQueries } from "react-query";

export const useFetchCartProducts = slugs => {
  const responses = useQueries(
    slugs.map(slug => ({
      queryKey: [QUERY_KEYS.PRODUCTS, slug],
      queryFn: () => productsApi.show(slug),
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
    queryFn: () => productsApi.fetchProduct(slug),
    staleTime: DEFAULT_STALE_TIME,
  });
