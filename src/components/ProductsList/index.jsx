import React, { useState, useEffect } from "react";

import { Header, PageLoader } from "components/commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import { isNotEmpty } from "neetocommons/pure";
import { Search } from "neetoicons";
import { Input, Pagination, NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import ProductListItem from "./ProductListItem";

const ProductsList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  const { t } = useTranslation();

  const debouncedSearchKey = useDebounce(searchKey, 300);

  const productsParams = {
    searchedProductName: debouncedSearchKey,
    page: currentPage,
    recordsPerPage: DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

  useEffect(() => {
    setCurrentPage(DEFAULT_PAGE_INDEX);
  }, [debouncedSearchKey]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen flex-col">
      <Header
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder={t("product.search")}
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      )}
      {isNotEmpty(products) && (
        <div className="mb-5 self-end">
          <Pagination
            count={totalProductsCount}
            navigate={page => setCurrentPage(page)}
            pageNo={currentPage}
            pageSize={DEFAULT_PAGE_SIZE}
          />
        </div>
      )}
    </div>
  );
};
export default ProductsList;
