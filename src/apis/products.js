import axios from "axios";

const fetchProducts = params => axios.get("products", { params });

const fetchProduct = slug => axios.get(`products/${slug}`);

const productsApi = { fetchProducts, fetchProduct };

export default productsApi;
