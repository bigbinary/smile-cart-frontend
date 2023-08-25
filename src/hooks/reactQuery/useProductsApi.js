import { DEFAULT_STALE_TIME, QUERY_KEYS } from "constants/query";

import productsApi from "apis/products";
import { path } from "ramda";
import { useQuery, useQueries } from "react-query";

export const useFetchCartProducts = slugs =>
  useQueries(
    slugs.map(slug => ({
      queryKey: [QUERY_KEYS.PRODUCTS, slug],
      // eslint-disable-next-line @bigbinary/neeto/use-react-query-for-managing-remote-data
      queryFn: () => productsApi.fetchProduct(slug),
      staleTime: DEFAULT_STALE_TIME,
    }))
  );

export const useFetchProducts = params =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productsApi.fetchProducts(params),
    select: path(["data"]),
    keepPreviousData: true,
    staleTime: DEFAULT_STALE_TIME,
  });

export const useFetchProduct = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slug],
    queryFn: () => productsApi.fetchProduct(slug),
    staleTime: DEFAULT_STALE_TIME,
  });
