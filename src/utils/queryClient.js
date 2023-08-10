import { QueryClient, QueryCache } from "react-query";

export default new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, useErrorBoundary: true },
  },
});
