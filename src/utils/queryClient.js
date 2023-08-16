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
  dehydrateOptions: {
    shouldDehydrateQuery: ({ queryKey }) =>
      QUERY_KEYS.CHECKOUT.includes(queryKey),
  },
});

export default queryClient;
