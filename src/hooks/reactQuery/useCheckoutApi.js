import { QUERY_KEYS } from "constants/query";

import countriesApi from "apis/countries";
import ordersApi from "apis/orders";
import statesApi from "apis/states";
import { prop } from "ramda";
import { useQuery, useMutation } from "react-query";

export const useFetchCountries = () =>
  useQuery({
    queryKey: QUERY_KEYS.COUNTRIES,
    queryFn: () => countriesApi.fetch(),
    select: prop("countries"),
    staleTime: Infinity,
  });

export const useFetchStates = stateParams =>
  useQuery({
    queryKey: [QUERY_KEYS.STATES, stateParams],
    queryFn: () => statesApi.fetch(stateParams),
    select: prop("states"),
    staleTime: Infinity,
  });

export const useCreateOrder = () => useMutation(ordersApi.create);
