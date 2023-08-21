import { SMILE_CART_BASE_URL } from "constants";

// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";

const fetchProducts = params =>
  axios.get(`${SMILE_CART_BASE_URL}/products`, { params });

const fetchProduct = slug =>
  axios.get(`${SMILE_CART_BASE_URL}/products/${slug}`);

// import { buildProducts } from "components/utils";
// import { filterBy, findBy } from "neetocommons/pure";
// import { includes, toLower } from "ramda";

// const products = buildProducts();

// const getSearchedProducts = (searchKey, page) =>
//   filterBy(
//     { name: name => includes(toLower(searchKey), toLower(name)) },
//     products
//   ).slice((page - 1) * 8, page * 8);

// const show = slug => findBy({ slug }, products);

const productsApi = { fetchProducts, fetchProduct };

export default productsApi;
