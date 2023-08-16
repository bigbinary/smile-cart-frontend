import { QUERY_KEYS } from "constants/query";

import { useQuery, useQueryClient, useMutation } from "react-query";

export const useFetchCheckoutForm = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QUERY_KEYS.CHECKOUT],
    queryFn: () => queryClient.getQueryData(QUERY_KEYS.CHECKOUT),
  });
};

export const useConfirmOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(payload =>
    queryClient.setQueryData(QUERY_KEYS.CHECKOUT, payload)
  );
};
