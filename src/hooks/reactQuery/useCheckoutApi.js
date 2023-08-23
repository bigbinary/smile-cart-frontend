import { QUERY_KEYS } from "constants/query";

import countriesApi from "apis/countries";
import statesApi from "apis/states";
import { path } from "ramda";
import { useQuery } from "react-query";

export const useFetchCountries = () =>
  useQuery({
    queryKey: [QUERY_KEYS.COUNTRIES],
    queryFn: () => countriesApi.fetchCounties(),
    staleTime: Infinity,
  });

export const useFetchStates = stateParams =>
  useQuery({
    queryKey: [QUERY_KEYS.STATES, stateParams],
    queryFn: () => statesApi.fetchStates(stateParams),
    select: path(["data", "states"]),
    staleTime: Infinity,
  });
