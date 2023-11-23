import { t } from "i18next";
import * as yup from "yup";

export const CHECKOUT_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email(t("validations.emailInvalid"))
    .required(t("validations.emailRequired")),
  country: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable(),
  firstName: yup.string().required(t("validations.firstNameRequired")),
  lastName: yup.string().required(t("validations.lastNameRequired")),
  address: yup.string().required(t("validations.addressRequired")),
  apartment: yup.string().required(t("validations.apartmentRequired")),
  city: yup.string().required(t("validations.cityRequired")),
  state: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable()
    .required(t("validations.stateRequired")),
  zipCode: yup.number().required(t("validations.zipCodeRequired")),
});

export const CHECKOUT_FORM_INITIAL_VALUES = {
  email: "",
  country: { value: "US", label: "United States" },
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: null,
  zipCode: "",
};

export const CHECKOUT_LOCAL_STORAGE_KEY = "checkoutUserDetails";
