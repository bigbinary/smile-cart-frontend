// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";

const fetch = () => axios.get("countries");

const countriesApi = { fetch };

export default countriesApi;
