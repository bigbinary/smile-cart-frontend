// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";

const fetch = () =>
  axios.get("https://countriesnow.space/api/v0.1/countries/iso");

const countriesApi = { fetch };

export default countriesApi;
