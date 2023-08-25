import { QUERY_KEYS } from "constants/query";

import countriesApi from "apis/countries";
import ordersApi from "apis/orders";
import statesApi from "apis/states";
import { path } from "ramda";
import { useQuery, useMutation } from "react-query";

export const useCreateOrder = options =>
  useMutation(ordersApi.create, {
    onSuccess: () => {
      options?.onSuccess?.();
    },
  });

export const useFetchCountries = () =>
  useQuery({
    queryKey: QUERY_KEYS.COUNTRIES,
    queryFn: () => countriesApi.fetch(),
    select: path(["data", "countries"]),
    staleTime: Infinity,
  });

export const useFetchStates = stateParams =>
  useQuery({
    queryKey: [QUERY_KEYS.STATES, stateParams],
    queryFn: () => statesApi.fetch(stateParams),
    select: path(["data", "states"]),
    staleTime: Infinity,
  });
