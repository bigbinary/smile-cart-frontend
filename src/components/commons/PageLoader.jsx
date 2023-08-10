import { React } from "react";

import { Spinner, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const PageLoader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <Spinner />
      <Typography style="h5" weight="semibold">
        {t("pageLoading")}
      </Typography>
    </div>
  );
};

export default PageLoader;
