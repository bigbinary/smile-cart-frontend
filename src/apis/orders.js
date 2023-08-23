// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";

import { SMILE_CART_BASE_URL } from "../constants";

const create = payload => axios.post(`${SMILE_CART_BASE_URL}/orders`, payload);

const ordersApi = { create };

export default ordersApi;
