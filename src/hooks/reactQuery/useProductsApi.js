import { DEFAULT_STALE_TIME, QUERY_KEYS } from "constants/query";

import productsApi from "apis/products";
import { useQuery } from "react-query";

export const useFetchCartProducts = slugs =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slugs],
    queryFn: () => Promise.all(slugs.map(slug => productsApi.show(slug))),
    staleTime: DEFAULT_STALE_TIME,
  });

export const useFetchProducts = params =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productsApi.fetchProducts(params),
    staleTime: DEFAULT_STALE_TIME,
    keepPreviousData: true,
  });

export const useFetchProduct = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slug],
    queryFn: () => productsApi.fetchProduct(slug),
    staleTime: DEFAULT_STALE_TIME,
  });
