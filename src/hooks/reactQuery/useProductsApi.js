import { DEFAULT_STALE_TIME, QUERY_KEYS } from "constants/query";

import productsApi from "apis/products";
import { useQuery } from "react-query";

export const useFetchCartProducts = slugs =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slugs],
    queryFn: () => Promise.all(slugs.map(slug => productsApi.show(slug))),
    staleTime: DEFAULT_STALE_TIME,
  });

export const useSearchedProducts = (searchKey, page) =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, searchKey, page],
    queryFn: () => productsApi.getSearchedProducts(searchKey, page),
    staleTime: DEFAULT_STALE_TIME,
    keepPreviousData: true,
  });

export const useShowProductBySlug = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slug],
    queryFn: () => productsApi.show(slug),
    staleTime: DEFAULT_STALE_TIME,
  });
