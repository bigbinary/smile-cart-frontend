import axios from "axios";

const show = slug => axios.get(`products/${slug}`);

const fetch = params => axios.get("products", { params });

const productsApi = { show, fetch };
export default productsApi;
