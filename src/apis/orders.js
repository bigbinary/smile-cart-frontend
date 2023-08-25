// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";

const create = payload => axios.post("orders", payload);

const ordersApi = { create };

export default ordersApi;
