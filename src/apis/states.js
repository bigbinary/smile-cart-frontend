import { STATE_LIST } from "components/constants";
import { findBy } from "neetocommons/pure";

const fetch = params => findBy(params, STATE_LIST);

const statesApi = { fetch };

export default statesApi;
