import axios from "axios";

const show = () =>
  axios.get(
    "https://smile-cart-backend-staging.neetodeployapp.com/products/mens-cotton-jacket"
  );

const productsApi = { show };
export default productsApi;
