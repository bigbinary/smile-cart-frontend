// eslint-disable-next-line @bigbinary/neeto/no-axios-import-outside-apis
import axios from "axios";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocommons/pure";
import { Toastr } from "neetoui";
import { evolve } from "ramda";

axios.defaults.baseURL = "/";

const setHttpHeaders = (setLoading = () => null) => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      ?.getAttribute("content"),
  };
  setLoading(false);
};

const shouldShowToastr = response =>
  typeof response === "string" ||
  (typeof response === "object" && (response?.notice || response?.noticeCode));

const showSuccessToastr = response => {
  const { showToastr = true } = response.config;
  if (!showToastr) return response;

  if (shouldShowToastr(response.data)) {
    Toastr.success(response.data);
  }

  return response;
};

const showErrorToastr = error => {
  const { showToastr = true } = error.config ?? {};
  if (!showToastr) return error;

  if (error.message === "Network Error") {
    Toastr.error("No Internet Connection");
  } else if (
    ![403, 404].includes(error.response?.status) &&
    !axios.isCancel(error)
  ) {
    Toastr.error(error);
  }

  return error;
};

const transformResponseKeysToCamelCase = response => {
  const { transformResponseCase = true } = response.config;

  if (response.data && transformResponseCase) {
    response.data = keysToCamelCase(response.data);
  }

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
  axios.interceptors.request.use(request => {
    const { transformRequestCase = true } = request;

    if (!transformRequestCase) return request;

    return evolve(
      { data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase },
      request
    );
  });
};

const registerIntercepts = () => {
  requestInterceptors();
  responseInterceptors();
};

export default function initializeAxios(setLoading = () => null) {
  setHttpHeaders(setLoading);
  registerIntercepts();
}
