import React, { useRef } from "react";

import TooltipWrapper from "components/commons/TooltipWrapper";
import { Input, Button, Toastr } from "neetoui";
import { paths } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

import { VALID_COUNT_REGEX } from "./constants";

const ProductQuantity = ({ slug, availableQuantity }) => {
  const { t } = useTranslation();

  const countInputFocus = useRef(null);

  const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
    paths([["cartItems", slug], ["setSelectedQuantity"]]),
    shallow
  );
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
      setSelectedQuantity(slug, availableQuantity);
      countInputFocus.current.blur();
    } else if (VALID_COUNT_REGEX.test(value)) {
      setSelectedQuantity(slug, value);
    }
  };

  return (
    <div className="neeto-ui-border-black neeto-ui-rounded border flex items-center">
      <Button
        className="focus-within:ring-0"
        label="-"
        style="text"
        onClick={e => {
          e.stopPropagation();
          setSelectedQuantity(slug, parsedSelectedQuantity - 1);
        }}
      />
      <Input
        nakedInput
        className="pl-1.5"
        contentSize="2"
        ref={countInputFocus}
        value={selectedQuantity}
        onChange={handleSetCount}
        onClick={e => e.stopPropagation()}
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
            e.stopPropagation();
            setSelectedQuantity(slug, parsedSelectedQuantity + 1);
          }}
        />
      </TooltipWrapper>
    </div>
  );
};

export default ProductQuantity;
