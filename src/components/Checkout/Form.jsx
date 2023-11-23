import React from "react";

import { useFormikContext } from "formik";
import {
  useFetchStates,
  useFetchCountries,
} from "hooks/reactQuery/useCheckoutApi";
import { renameKeys } from "neetocist";
import { Typography } from "neetoui";
import { Input, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

const Form = () => {
  const { t } = useTranslation();

  const {
    setFieldValue,
    values: { country },
  } = useFormikContext();

  const { data: countries = [] } = useFetchCountries();
  const { data: states = [] } = useFetchStates({
    countryCode: country.value,
  });

  const handleChangeCountry = country => {
    setFieldValue("country", country);
    setFieldValue("state", null);
  };

  return (
    <>
      <Typography style="h3" weight="semibold">
        {t("contact")}
      </Typography>
      <Input
        required
        label={t("email")}
        name="email"
        placeholder={t("enterYourEmail")}
        size="large"
      />
      <Typography className="pt-5" style="h3" weight="semibold">
        {t("shippingAddress")}
      </Typography>
      <Select
        required
        label={t("country")}
        name="country"
        options={renameKeys({ name: "label", code: "value" }, countries)}
        placeholder={t("selectCountry")}
        size="large"
        value={country}
        onChange={handleChangeCountry}
      />
      <div className="flex space-x-2">
        <Input
          required
          label={t("firstName")}
          name="firstName"
          placeholder={t("enterFirstName")}
          size="large"
        />
        <Input
          required
          label={t("lastName")}
          name="lastName"
          placeholder={t("enterLastName")}
          size="large"
        />
      </div>
      <Input
        required
        label={t("address")}
        name="address"
        placeholder={t("enterAddress")}
        size="large"
      />
      <Input
        required
        label={t("apartment")}
        name="apartment"
        placeholder={t("enterApartmentNumber")}
        size="large"
      />
      <div className="flex space-x-2">
        <Input
          required
          label={t("city")}
          name="city"
          placeholder={t("enterCity")}
          size="large"
        />
        <Select
          required
          label={t("state")}
          name="state"
          options={renameKeys({ name: "label", code: "value" }, states)}
          placeholder={t("selectState")}
          size="large"
        />
        <Input
          required
          label={t("zipCode")}
          name="zipCode"
          placeholder={t("enterZipCode")}
          size="large"
          type="number"
        />
      </div>
    </>
  );
};

export default Form;
