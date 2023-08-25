import React, { useRef } from "react";

import TooltipWrapper from "components/commons/TooltipWrapper";
import { Input, Button, Toastr } from "neetoui";
import { useTranslation } from "react-i18next";

import { VALID_COUNT_REGEX } from "./constants";
import useSelectedQuantity from "./hooks/useSelectedQuantity";

const ProductQuantity = ({ slug, availableQuantity }) => {
  const { t } = useTranslation();

  const countInputFocus = useRef(null);

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const parsedSelectedQuantity = parseInt(selectedQuantity) || 0;
  const isNotValidQuantity = parsedSelectedQuantity >= availableQuantity;

  const handleSetCount = event => {
    const { value } = event.target;
    const isNotValidInputQuantity = parseInt(value) > availableQuantity;

    if (isNotValidInputQuantity) {
      const errorMessage = t("product.error.quantityLimit", {
        availableQuantity,
        count: availableQuantity,
      });

      Toastr.error(errorMessage, { autoClose: 2000 });
      setSelectedQuantity(availableQuantity);
      countInputFocus.current.blur();
    } else if (VALID_COUNT_REGEX.test(value)) {
      setSelectedQuantity(value);
    }
  };

  const preventNavigation = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className="neeto-ui-border-black neeto-ui-rounded flex items-center border">
      <Button
        className="focus-within:ring-0"
        label="-"
        style="text"
        onClick={e => {
          preventNavigation(e);
          setSelectedQuantity(slug, parsedSelectedQuantity - 1);
        }}
      />
      <Input
        nakedInput
        className="ml-2"
        contentSize="2"
        ref={countInputFocus}
        value={selectedQuantity}
        onChange={handleSetCount}
        onClick={preventNavigation}
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
          onClick={e => {
            preventNavigation(e);
            setSelectedQuantity(slug, parsedSelectedQuantity + 1);
          }}
        />
      </TooltipWrapper>
    </div>
  );
};

export default ProductQuantity;
