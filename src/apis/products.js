import axios from "axios";

const show = () => axios.get("products/infinix-inbook-2");

const productsApi = { show };
export default productsApi;
