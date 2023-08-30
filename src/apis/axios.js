// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";
import { t } from "i18next";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocommons/pure";
import { Toastr } from "neetoui";
import { evolve } from "ramda";
import { SMILE_CART_BASE_URL } from "src/constants";

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const shouldShowToastr = response =>
  typeof response === "object" && response?.noticeCode;

const showSuccessToastr = response => {
  if (shouldShowToastr(response.data)) Toastr.success(response.data);

  return response;
};

const showErrorToastr = error => {
  if (error.message === t("error.networkError")) {
    Toastr.error(t("error.noInternetConnection"));
  } else if (error.response?.status !== 404) {
    Toastr.error(error);
  }

  return error;
};

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);

  return response;
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      transformResponseKeysToCamelCase(response);
      showSuccessToastr(response);

      return response;
    },
    error => showErrorToastr(error)
  );
};

const requestInterceptors = () => {
  axios.interceptors.request.use(request =>
    evolve(
      { data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase },
      request
    )
  );
};

const registerIntercepts = () => {
  requestInterceptors();
  responseInterceptors();
};

export default function initializeAxios() {
  axios.defaults.baseURL = SMILE_CART_BASE_URL;
  setHttpHeaders();
  registerIntercepts();
}
