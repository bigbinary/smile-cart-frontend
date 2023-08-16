import React from "react";

import { PageLoader, PageNotFound } from "components/commons";
import { totalPrice } from "components/utils";
import {
  useFetchCheckoutForm,
  useConfirmOrder,
} from "hooks/reactQuery/useCheckoutApi";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import { Toastr, Typography } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { isEmpty, keys } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";

import {
  CHECKOUT_FORM_INITIAL_VALUES,
  CHECKOUT_FORM_VALIDATION_SCHEMA,
} from "./constants";
import Form from "./Form";
import Items from "./Items";

const Checkout = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const { cartItems, clearCart } = useCartItemsStore.pick();
  const { mutate: confirmOrder } = useConfirmOrder();

  const { data: checkoutFormData } = useFetchCheckoutForm();

  const { data: products = [], isLoading } = useFetchCartProducts(
    keys(cartItems)
  );

  const handleSubmit = values => {
    confirmOrder(values, {
      onSuccess: () => {
        Toastr.success("", { icon: "👍", className: "w-20" });
        setTimeout(() => {
          history.push(routes.root);
          clearCart();
        }, 1500);
      },
    });
  };

  if (isLoading) return <PageLoader />;

  if (isEmpty(cartItems)) return <PageNotFound />;

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
          <div className="mt-10 space-y-4">
            <Form />
          </div>
        </div>
        <div className="neeto-ui-bg-gray-300 h-screen w-1/2 pt-10">
          <Items
            {...{ cartItems, products }}
            totalPrice={totalPrice(cartItems, products)}
          />
        </div>
      </div>
    </NeetoUIForm>
  );
};

export default Checkout;
