import React from "react";

import { useFormikContext } from "formik";
import { toLabelAndValue } from "neetocommons/pure";
import { Typography, Checkbox } from "neetoui";
import { Input, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

const Form = ({
  isInformationSavedForNextTime,
  setIsInformationSavedForNextTime,
  countries,
  setSelectedCountry,
  stateList,
}) => {
  const { t } = useTranslation();

  const { setFieldValue, values } = useFormikContext();

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
        onChange={country => {
          setSelectedCountry(country);
          setFieldValue("country", country);
        }}
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
          options={stateList?.map(({ name, code }) => ({
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
