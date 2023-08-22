import { QUERY_KEYS } from "constants/query";

import countriesApi from "apis/countries";
import statesApi from "apis/states";
import { useQuery } from "react-query";

export const useFetchCountries = () =>
  useQuery({
    queryKey: QUERY_KEYS.COUNTRIES,
    queryFn: () => countriesApi.fetchCounties(),
    staleTime: Infinity,
  });

export const useFetchStates = selectedCountry =>
  useQuery({
    queryKey: [QUERY_KEYS.STATES, selectedCountry],
    queryFn: () => statesApi.fetchStates({ country: selectedCountry.label }),
    staleTime: Infinity,
  });
