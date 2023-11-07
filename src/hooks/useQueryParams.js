import { parse } from "qs";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();

  return parse(location.search, { ignoreQueryPrefix: true });
};

export default useQueryParams;
