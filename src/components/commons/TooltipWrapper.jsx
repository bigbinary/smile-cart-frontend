import React from "react";

import { Tooltip } from "@bigbinary/neetoui";

const TooltipWrapper = ({ showTooltip, children, tooltipProps }) => {
  if (showTooltip) {
    return (
      <Tooltip {...tooltipProps}>
        <div>{children}</div>
      </Tooltip>
    );
  }

  return children;
};

export default TooltipWrapper;
