import { PageLoader } from "components/commons";
import { useFetchCountries } from "hooks/reactQuery/useCheckoutApi";
import i18n from "i18next";
import { LeftArrow } from "neetoicons";
import { Typography } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import withTitle from "utils/withTitle";

import { CHECKOUT_FORM_INITIAL_VALUES } from "./constants";
import Form from "./Form";

const Checkout = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const { isLoading } = useFetchCountries();

  const handleRedirect = () => {
    history.goBack();
  };

  if (isLoading) return <PageLoader />;

  return (
    <NeetoUIForm
      formProps={{ noValidate: true }}
      formikProps={{
        initialValues: CHECKOUT_FORM_INITIAL_VALUES,
      }}
    >
      <div className="flex space-x-4">
        <div className="m-10 w-1/2">
          <div className="flex items-center">
            <LeftArrow
              className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-4"
              onClick={handleRedirect}
            />
            <Typography
              className="text-left"
              component="u"
              style="h3"
              textTransform="uppercase"
              weight="bold"
            >
              {t("checkout")}
            </Typography>
          </div>
          <div className="mt-8 space-y-4">
            <Form />
          </div>
        </div>
        <div className="neeto-ui-bg-gray-300 h-screen w-1/2 pt-10">
          {/* Items added to cart will be displayed here */}
        </div>
      </div>
    </NeetoUIForm>
  );
};

export default withTitle(Checkout, i18n.t("checkout"));
