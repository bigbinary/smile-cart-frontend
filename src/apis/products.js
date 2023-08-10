import { PRODUCTS } from "components/constants";
import { findBy } from "neetocommons/pure";

const show = slug => findBy({ slug }, PRODUCTS);

const productsApi = { show };

export default productsApi;
