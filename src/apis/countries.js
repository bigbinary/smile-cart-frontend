// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";

import { SMILE_CART_BASE_URL } from "../constants";

const fetchCounties = () => axios.get(`${SMILE_CART_BASE_URL}/countries`);

const countriesApi = { fetchCounties };

export default countriesApi;
