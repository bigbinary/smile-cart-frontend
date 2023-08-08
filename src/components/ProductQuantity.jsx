import React, { useRef } from "react";

import TooltipWrapper from "components/commons/TooltipWrapper";
import { Input, Button, Toastr } from "neetoui";
import { isEmpty, paths } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

const ProductQuantity = ({
  id,
  availableQuantity,
  isDecrementCounterDisabled = true,
}) => {
  const { t } = useTranslation();

  const countInputFocus = useRef(null);

  const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
    paths([["cartItems", id], ["setSelectedQuantity"]]),
    shallow
  );
  const updatedQuantity = parseInt(selectedQuantity) || 0;

  const isNotValidQuantity = selectedQuantity =>
    selectedQuantity >= availableQuantity;

  const handleSetCount = event => {
    const { value } = event.target;

    if (isNotValidQuantity(parseInt(value))) {
      const errorMessage = t("product.error.quantityLimit", {
        availableQuantity,
        count: availableQuantity,
      });

      Toastr.error(errorMessage, { autoClose: 2000 });
      setSelectedQuantity(id, availableQuantity);
      countInputFocus.current.blur();
    } else if (!isNaN(value)) {
      setSelectedQuantity(id, value);
    }
  };

  return (
    <div className="neeto-ui-border-black neeto-ui-rounded flex items-center border">
      <Button
        className="focus-within:ring-0"
        disabled={isDecrementCounterDisabled && isEmpty(selectedQuantity)}
        label="-"
        style="text"
        onClick={() => setSelectedQuantity(id, updatedQuantity - 1)}
      />
      <Input
        nakedInput
        className="pl-1.5"
        contentSize="2"
        ref={countInputFocus}
        value={selectedQuantity}
        onChange={handleSetCount}
      />
      <TooltipWrapper
        showTooltip={isNotValidQuantity(updatedQuantity)}
        tooltipProps={{ content: t("product.maximumUnits"), position: "top" }}
      >
        <Button
          className="focus-within:ring-0"
          disabled={isNotValidQuantity(updatedQuantity)}
          label="+"
          style="text"
          onClick={() => setSelectedQuantity(id, updatedQuantity + 1)}
        />
      </TooltipWrapper>
    </div>
  );
};

export default ProductQuantity;
