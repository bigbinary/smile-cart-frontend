import React from "react";

import { Tooltip } from "@bigbinary/neetoui";

const TooltipWrapper = ({ disabled, children, tooltipProps }) => {
  if (disabled) {
    return (
      <Tooltip {...tooltipProps}>
        <div>{children}</div>
      </Tooltip>
    );
  }

  return children;
};

export default TooltipWrapper;
