import React, { useRef } from "react";

import TooltipWrapper from "components/commons/TooltipWrapper";
import { Input, Button, Toastr } from "neetoui";
import { equals, gt, isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

const ProductQuantity = ({
  id,
  selectedQuantity,
  setSelectedQuantity,
  availableQuantity,
  shouldDisableDecrementCounter = true,
}) => {
  const { t } = useTranslation();

  const countInputFocus = useRef(null);

  const isDecrementCounterDisabled =
    equals(selectedQuantity, 1) || isEmpty(selectedQuantity);
  const isValidQuantity = selectedQuantity >= availableQuantity;

  const handleSetCount = event => {
    const {
      target: { value },
    } = event;

    const currentQuantity = parseInt(value);
    const isNotValidProductQuantity = gt(currentQuantity, availableQuantity);

    if (isNotValidProductQuantity) {
      Toastr.error(t("product.error.quantityLimit", { availableQuantity }), {
        autoClose: 2000,
      });
      setSelectedQuantity(id, availableQuantity);
      countInputFocus.current.blur();
    } else if (!isNaN(value)) {
      setSelectedQuantity(id, currentQuantity || "");
    }
  };

  return (
    <div className="neeto-ui-border-black neeto-ui-rounded flex items-center border">
      <Button
        className="focus-within:ring-0"
        disabled={shouldDisableDecrementCounter && isDecrementCounterDisabled}
        label="-"
        style="text"
        onClick={() => setSelectedQuantity(id, selectedQuantity - 1)}
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
        showTooltip={isValidQuantity}
        tooltipProps={{ content: t("product.maximumUnits"), position: "top" }}
      >
        <Button
          className="focus-within:ring-0"
          disabled={isValidQuantity}
          label="+"
          style="text"
          onClick={() =>
            setSelectedQuantity(id, parseInt(selectedQuantity + 1))
          }
        />
      </TooltipWrapper>
    </div>
  );
};

export default ProductQuantity;
