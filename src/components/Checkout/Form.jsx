import React, { useState } from "react";

import { useFormikContext } from "formik";
import {
  useFetchStates,
  useFetchCountries,
} from "hooks/reactQuery/useCheckoutApi";
import { toLabelAndValue } from "neetocommons/pure";
import { Typography, Checkbox } from "neetoui";
import { Input, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { getFromLocalStorage } from "utils/storage";

import {
  CHECKOUT_FORM_INITIAL_VALUES,
  CHECKOUT_LOCAL_STORAGE_KEY,
} from "./constants";

const Form = ({
  isInformationSavedForNextTime,
  setIsInformationSavedForNextTime,
}) => {
  const checkoutFormData = getFromLocalStorage(CHECKOUT_LOCAL_STORAGE_KEY);

  const [selectedCountry, setSelectedCountry] = useState(
    checkoutFormData?.country || CHECKOUT_FORM_INITIAL_VALUES.country
  );

  const { t } = useTranslation();

  const { setFieldValue, values } = useFormikContext();

  const { data: { data: countries } = [] } = useFetchCountries();

  const { data: { states } = [] } = useFetchStates({
    selectedCountry,
  });

  const handleChangeCountry = country => {
    setSelectedCountry(country);
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
        options={countries.data.map(({ name }) => toLabelAndValue(name))}
        placeholder={t("checkout.selectCountry")}
        size="large"
        value={values.country}
        onChange={country => handleChangeCountry(country)}
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
          placeholder={t("checkout.selectState")}
          size="large"
          options={states?.map(({ name, code }) => ({
            label: name,
            value: code,
          }))}
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
      <Checkbox
        checked={isInformationSavedForNextTime}
        label={t("checkout.checkboxTitle")}
        onChange={() => setIsInformationSavedForNextTime(isSaved => !isSaved)}
      />
    </>
  );
};

export default Form;
