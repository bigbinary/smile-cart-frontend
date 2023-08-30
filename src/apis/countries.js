import axios from "axios";

const fetch = () => axios.get("countries");

const countriesApi = { fetch };

export default countriesApi;
