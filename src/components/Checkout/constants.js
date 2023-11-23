import { t } from "i18next";
import * as yup from "yup";

export const CHECKOUT_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email(t("checkout.validations.emailInvalid"))
    .required(t("checkout.validations.emailRequired")),
  country: yup
    .object()
    .shape({
      name: yup.string().required(),
      code: yup.string().required(),
    })
    .nullable(),
  firstName: yup.string().required(t("checkout.validations.firstNameRequired")),
  lastName: yup.string().required(t("checkout.validations.lastNameRequired")),
  address: yup.string().required(t("checkout.validations.addressRequired")),
  apartment: yup.string().required(t("checkout.validations.apartmentRequired")),
  city: yup.string().required(t("checkout.validations.cityRequired")),
  state: yup
    .object()
    .shape({
      name: yup.string().required(),
      code: yup.string().required(),
    })
    .nullable()
    .required(t("checkout.validations.stateRequired")),
  zipCode: yup.number().required(t("checkout.validations.zipCodeRequired")),
});

export const CHECKOUT_FORM_INITIAL_VALUES = {
  email: "",
  country: { code: "US", name: "United States" },
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: null,
  zipCode: "",
};

export const CHECKOUT_LOCAL_STORAGE_KEY = "checkoutUserDetails";
