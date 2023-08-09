import React from "react";

import { Tooltip } from "neetoui";

const TooltipWrapper = ({ showTooltip, children, ...tooltipProps }) => {
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
