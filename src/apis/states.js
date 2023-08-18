import { STATE_LIST } from "components/constants";
import { findBy } from "neetocommons/pure";

const fetchStates = params => findBy(params, STATE_LIST);

const statesApi = { fetchStates };

export default statesApi;
