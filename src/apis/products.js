import { SMILE_CART_BASE_URL } from "constants";

// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";

const fetchProducts = params =>
  axios.get(`${SMILE_CART_BASE_URL}/products`, { params });

const fetchProduct = slug =>
  axios.get(`${SMILE_CART_BASE_URL}/products/${slug}`);

const productsApi = { fetchProducts, fetchProduct };

export default productsApi;
