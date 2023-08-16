import React from "react";

import { Typography, Checkbox } from "neetoui";
import { Input, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { COUNTRY_LIST, STATE_LIST } from "./constants";

const Form = () => {
  const { t } = useTranslation();

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
        labelProps={{ className: "w-full" }}
        name="country"
        options={COUNTRY_LIST}
        placeholder={t("checkout.selectCountry")}
        size="large"
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
          labelProps={{ className: "w-full" }}
          name="state"
          options={STATE_LIST}
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
      <Checkbox
        checked
        id="checkbox_name"
        label={t("checkout.checkboxTitle")}
        onChange={function noRefCheck() {}}
      />
    </>
  );
};
export default Form;
