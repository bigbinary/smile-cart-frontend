import React, { useState, useEffect } from "react";

import { Header, PageLoader } from "components/commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import useQueryParams from "hooks/useQueryParams";
import { keysToCamelCase, filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, Pagination, NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";
import withTitle from "utils/withTitle";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import ProductListItem from "./ProductListItem";

const ProductsList = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();
  const { page, recordsPerPage, searchedProductName } =
    keysToCamelCase(queryParams);

  const [searchKey, setSearchKey] = useState(searchedProductName);

  const debouncedSearchKey = useDebounce(searchKey);

  const productsParams = {
    searchedProductName: debouncedSearchKey || null,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    recordsPerPage: Number(recordsPerPage) || DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

  const replaceUrl = page => {
    const params = {
      page: page || DEFAULT_PAGE_INDEX,
      records_per_page: recordsPerPage || DEFAULT_PAGE_SIZE,
      searched_product_name: debouncedSearchKey || null,
    };

    history.replace(buildUrl(routes.products.index, filterNonNull(params)));
  };

  useEffect(() => {
    replaceUrl(page);
  }, [debouncedSearchKey]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen flex-col">
      <Header
        shouldShowBackButton={false}
        title={t("title")}
        actionBlock={
          <Input
            placeholder={t("product.search")}
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={e => {
              setSearchKey(e.target.value);
              replaceUrl(DEFAULT_PAGE_INDEX);
            }}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title={t("noData")} />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      )}
      <div className="mb-5 self-end">
        <Pagination
          count={totalProductsCount}
          navigate={page => replaceUrl(page)}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={Number(recordsPerPage) || DEFAULT_PAGE_INDEX}
        />
      </div>
    </div>
  );
};

export default withTitle(ProductsList);
