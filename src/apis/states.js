// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";

import { SMILE_CART_BASE_URL } from "../constants";

const fetch = params => axios.get(`${SMILE_CART_BASE_URL}/states`, { params });

const statesApi = { fetch };

export default statesApi;
