import React, { useRef } from "react";

import TooltipWrapper from "components/commons/TooltipWrapper";
import { Input, Button, Toastr } from "neetoui";
import { paths } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

import { VALID_COUNT_REGEX } from "./constants";

const ProductQuantity = ({ id, availableQuantity }) => {
  const { t } = useTranslation();

  const countInputFocus = useRef(null);

  const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
    paths([["cartItems", id], ["setSelectedQuantity"]]),
    shallow
  );
  const updatedQuantity = parseInt(selectedQuantity) || 0;

  const isNotValidQuantity = updatedQuantity >= availableQuantity;

  const handleSetCount = event => {
    const { value } = event.target;
    const isNotValidQuantity = parseInt(value) > availableQuantity;

    if (isNotValidQuantity) {
      const errorMessage = t("product.error.quantityLimit", {
        availableQuantity,
        count: availableQuantity,
      });

      Toastr.error(errorMessage, { autoClose: 2000 });
      setSelectedQuantity(id, availableQuantity);
      countInputFocus.current.blur();
    } else if (VALID_COUNT_REGEX.test(value)) {
      setSelectedQuantity(id, value);
    }
  };

  return (
    <div className="neeto-ui-border-black neeto-ui-rounded flex items-center border">
      <Button
        className="focus-within:ring-0"
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
        content={t("product.maximumUnits")}
        position="top"
        showTooltip={isNotValidQuantity}
      >
        <Button
          className="focus-within:ring-0"
          disabled={isNotValidQuantity}
          label="+"
          style="text"
          onClick={() => setSelectedQuantity(id, updatedQuantity + 1)}
        />
      </TooltipWrapper>
    </div>
  );
};

export default ProductQuantity;
