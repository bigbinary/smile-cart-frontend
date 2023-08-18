// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";

const fetchCounties = () =>
  axios.get("https://countriesnow.space/api/v0.1/countries/iso");

const countriesApi = { fetchCounties };

export default countriesApi;
