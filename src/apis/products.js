import axios from "axios";

const show = slug => axios.get(`products/${slug}`);

const fetch = () => axios.get("products");

const productsApi = { show, fetch };
export default productsApi;
