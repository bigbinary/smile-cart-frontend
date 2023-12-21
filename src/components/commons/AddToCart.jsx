import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { Button } from "neetoui";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";

import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ slug }) => {
  const { t } = useTranslation();

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedQuantity(1);
  };

  if (isNil(selectedQuantity)) {
    return <Button label={t("addToCart")} size="large" onClick={handleClick} />;
  }

  return <ProductQuantity {...{ slug }} />;
};

export default AddToCart;
