import { t } from "i18next";
import * as yup from "yup";

export const CHECKOUT_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email(t("checkout.validations.error.emailInvalid"))
    .required(t("checkout.validations.emailRequired")),
  country: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
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
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable()
    .required(t("checkout.validations.stateRequired")),
  zipCode: yup.number().required(t("checkout.validations.zipCodeRequired")),
});

export const COUNTRY_LIST = [
  { label: "USA", value: "usa" },
  { label: "India", value: "india" },
  { label: "France", value: "france" },
];

export const STATE_LIST = [
  { label: "Kerala", value: "kerala" },
  { label: "TamilNadu", value: "tamilNadu" },
  { label: "Goa", value: "goa" },
];

export const CHECKOUT_FORM_INITIAL_VALUES = {
  email: "",
  country: COUNTRY_LIST[0],
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: [],
  zipCode: "",
};
