import axios from "axios";

const fetch = params => axios.get("states", { params });

const statesApi = { fetch };

export default statesApi;
