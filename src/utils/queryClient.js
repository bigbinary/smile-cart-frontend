import { QueryClient, QueryCache } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";

import { QUERY_KEYS } from "../constants/query";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, useErrorBoundary: true },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
  maxAge: Infinity,
  dehydrateOptions: {
    shouldDehydrateQuery: ({ queryKey }) =>
      queryKey.includes(QUERY_KEYS.COUNTRIES, QUERY_KEYS.STATES),
  },
});

export default queryClient;
