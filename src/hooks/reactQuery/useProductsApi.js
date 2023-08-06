import { DEFAULT_STALE_TIME, QUERY_KEYS } from "constants/query";

import productsApi from "apis/products";
import { useQuery } from "react-query";

const useSearchedProducts = (searchKey, page) =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS_LIST, searchKey, page],
    queryFn: () => productsApi.getSearchedProducts(searchKey, page),
    staleTime: DEFAULT_STALE_TIME,
    keepPreviousData: true,
  });

const useShowProductBySlug = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCT_DETAILS, slug],
    queryFn: () => productsApi.show(slug),
    staleTime: DEFAULT_STALE_TIME,
  });

export { useShowProductBySlug, useSearchedProducts };
