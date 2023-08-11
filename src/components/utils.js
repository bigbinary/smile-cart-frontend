import { dynamicArray } from "neetocommons/pure";
import { modify, concat, __ } from "ramda";

import { SAMPLE_PRODUCTS } from "./constants";

export const buildProducts = () =>
  dynamicArray(8, index =>
    SAMPLE_PRODUCTS.map(product =>
      modify("slug", concat(__, `-${index}`), product)
    )
  ).flat();
