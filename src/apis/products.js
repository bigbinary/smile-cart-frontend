import axios from "axios";

const show = () => axios.get("products/mens-cotton-jacket");

const productsApi = { show };
export default productsApi;
