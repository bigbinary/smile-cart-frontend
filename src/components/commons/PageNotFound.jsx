import React from "react";

import { NoData } from "neetoui";

const PageNotFound = () => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <NoData
      title="The page you're looking for can't be found"
      primaryButtonProps={{
        label: "Back to home",
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: "/products",
      }}
    />
  </div>
);

export default PageNotFound;
