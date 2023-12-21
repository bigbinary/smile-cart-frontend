import { useRef } from "react";

import { TooltipWrapper } from "components/commons";
import { VALID_COUNT_REGEX } from "components/constants";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { Toastr, Input, Button } from "neetoui";
import { useTranslation } from "react-i18next";

const ProductQuantity = ({ slug, availableQuantity }) => {
  const { t } = useTranslation();

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const countInputFocus = useRef(null);

  const parsedSelectedQuantity = parseInt(selectedQuantity) || 0;
  const isNotValidQuantity = parsedSelectedQuantity >= availableQuantity;

  const handleSetCount = event => {
    const { value } = event.target;
    const isNotValidInputQuantity = parseInt(value) > availableQuantity;

    if (isNotValidInputQuantity) {
      const errorMessage = t("error.quantityLimit", {
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
    <div className="neeto-ui-border-black neeto-ui-rounded inline-flex flex-row items-center border">
      <Button
        className="focus-within:ring-0"
        label="-"
        style="text"
        onClick={e => {
          preventNavigation(e);
          setSelectedQuantity(parsedSelectedQuantity - 1);
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
        content={t("reachedMaximumUnits")}
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
            setSelectedQuantity(parsedSelectedQuantity + 1);
          }}
        />
      </TooltipWrapper>
    </div>
  );
};

export default ProductQuantity;
