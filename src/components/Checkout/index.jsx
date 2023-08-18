import React, { useState } from "react";

import { PageLoader } from "components/commons";
import { totalPrice } from "components/utils";
import { Toastr, Typography } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";
import { setToLocalStorage, getFromLocalStorage } from "utils/storage";

import {
  CHECKOUT_FORM_INITIAL_VALUES,
  CHECKOUT_FORM_VALIDATION_SCHEMA,
  CHECKOUT_LOCAL_STORAGE_KEY,
} from "./constants";
import Form from "./Form";
import useCheckout from "./hooks/useCheckout";
import Items from "./Items";

const Checkout = () => {
  const [isInformationSavedForNextTime, setIsInformationSavedForNextTime] =
    useState(false);

  const { t } = useTranslation();
  const history = useHistory();

  const checkoutFormData = getFromLocalStorage(CHECKOUT_LOCAL_STORAGE_KEY);

  const { cartItems } = useCartItemsStore.pick();

  const {
    countries,
    states,
    products,
    isLoading,
    setSelectedCountry,
    redirectToHome,
  } = useCheckout({ country: checkoutFormData.country });

  const handleSubmit = values => {
    isInformationSavedForNextTime
      ? setToLocalStorage(CHECKOUT_LOCAL_STORAGE_KEY, values)
      : setToLocalStorage(CHECKOUT_LOCAL_STORAGE_KEY, null);

    Toastr.success("", { icon: "👍", className: "w-20" });
    redirectToHome();
  };

  if (isLoading) return <PageLoader />;

  if (isEmpty(cartItems)) return history.push(routes.root);

  return (
    <NeetoUIForm
      formProps={{ noValidate: true }}
      formikProps={{
        initialValues: checkoutFormData || CHECKOUT_FORM_INITIAL_VALUES,
        validationSchema: CHECKOUT_FORM_VALIDATION_SCHEMA,
        onSubmit: handleSubmit,
      }}
    >
      <div className="flex space-x-4">
        <div className="m-10 w-1/2">
          <Typography
            className="text-left"
            style="h3"
            textTransform="uppercase"
            weight="bold"
          >
            {t("checkout.title")}
          </Typography>
          <div className="mt-8 space-y-4">
            <Form
              {...{
                countries,
                isInformationSavedForNextTime,
                setIsInformationSavedForNextTime,
                setSelectedCountry,
                states,
              }}
            />
          </div>
        </div>
        <div className="neeto-ui-bg-gray-300 h-screen w-1/2 pt-10">
          <Items
            {...{ products }}
            totalPrice={totalPrice(cartItems, products)}
          />
        </div>
      </div>
    </NeetoUIForm>
  );
};

export default Checkout;
