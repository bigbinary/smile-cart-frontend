import { memo, useState } from "react";

import ProductQuantity from "components/commons/ProductQuantity";
import { Delete } from "neetoicons";
import { Alert, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";

const ProductCard = ({
  slug,
  imageUrl,
  offerPrice,
  mrp,
  name,
  availableQuantity,
}) => {
  const { t } = useTranslation();

  const removeCartItem = useCartItemsStore.pickFrom();

  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black border p-2">
      <div className="flex w-full items-center space-x-5">
        <img alt={name} height="80px" src={imageUrl} width="80px" />
        <div className="flex-grow space-y-1">
          <Typography className="mb-2" style="h4" weight="bold">
            {name}
          </Typography>
          <Typography style="body2">{t("mrp", { mrp })}</Typography>
          <Typography style="body2">
            {t("offerPrice", { offerPrice })}
          </Typography>
        </div>
        <div className="flex items-center space-x-2">
          <ProductQuantity {...{ availableQuantity, slug }} />
          <Delete
            className="cursor-pointer"
            onClick={() => setShouldShowDeleteAlert(true)}
          />
          <Alert
            isOpen={shouldShowDeleteAlert}
            submitButtonLabel={t("removeItemConfirmation.button")}
            title={t("removeItemConfirmation.title")}
            message={
              <Trans
                i18nKey="removeItemConfirmation.message"
                values={{ name }}
              />
            }
            onClose={() => setShouldShowDeleteAlert(false)}
            onSubmit={() => removeCartItem(slug)}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
