import React from "react";

import { useFormikContext } from "formik";
import {
  useFetchStates,
  useFetchCountries,
} from "hooks/reactQuery/useCheckoutApi";
import { renameKeys } from "neetocommons/pure";
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
        {t("checkout.contact")}
      </Typography>
      <Input
        required
        label={t("checkout.email")}
        name="email"
        placeholder={t("checkout.enterYourEmail")}
        size="large"
      />
      <Typography className="pt-5" style="h3" weight="semibold">
        {t("checkout.shippingAddress")}
      </Typography>
      <Select
        required
        label={t("checkout.country")}
        name="country"
        options={renameKeys({ name: "label", code: "value" }, countries)}
        placeholder={t("checkout.selectCountry")}
        size="large"
        value={country}
        onChange={handleChangeCountry}
      />
      <div className="flex space-x-2">
        <Input
          required
          label={t("checkout.firstName")}
          name="firstName"
          placeholder={t("checkout.enterFirstName")}
          size="large"
        />
        <Input
          required
          label={t("checkout.lastName")}
          name="lastName"
          placeholder={t("checkout.enterLastName")}
          size="large"
        />
      </div>
      <Input
        required
        label={t("checkout.address")}
        name="address"
        placeholder={t("checkout.enterAddress")}
        size="large"
      />
      <Input
        required
        label={t("checkout.apartment")}
        name="apartment"
        placeholder={t("checkout.enterApartmentNumber")}
        size="large"
      />
      <div className="flex space-x-2">
        <Input
          required
          label={t("checkout.city")}
          name="city"
          placeholder={t("checkout.enterCity")}
          size="large"
        />
        <Select
          required
          label={t("checkout.state")}
          name="state"
          options={renameKeys({ name: "label", code: "value" }, states)}
          placeholder={t("checkout.selectState")}
          size="large"
        />
        <Input
          required
          label={t("checkout.zipCode")}
          name="zipCode"
          placeholder={t("checkout.enterZipCode")}
          size="large"
          type="number"
        />
      </div>
    </>
  );
};

export default Form;
