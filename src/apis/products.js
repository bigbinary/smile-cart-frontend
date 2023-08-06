/* TODO: Connect to backend

import axios from "axios";

const getSearchedProducts = (searchKey, page) =>
  axios.get("api/products", {
    params: { search_key: searchKey, page_number: page },
  });

const show = slug => axios.get(`api/products/${slug}`);

*/

import { PRODUCTS } from "components/constants";
import { filterBy, findBy } from "neetocommons/pure";
import { includes, toLower } from "ramda";

const getSearchedProducts = (searchKey, page) =>
  filterBy(
    { name: name => includes(toLower(searchKey), toLower(name)) },
    PRODUCTS
  ).slice((page - 1) * 8, page * 8);

const show = slug => findBy({ slug }, PRODUCTS);

const productsApi = { getSearchedProducts, show };

export default productsApi;
