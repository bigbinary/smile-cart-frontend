import React, { useState } from "react";

import { Header, PageLoader } from "components/commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, Pagination } from "neetoui";
import { useTranslation } from "react-i18next";

import ProductListItem from "./ProductListItem";

const ProductsList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { t } = useTranslation();

  const debouncedSearchKey = useDebounce(searchKey, 300);

  const productsParams = {
    searchedProductName: debouncedSearchKey,
    page: currentPage,
    recordsPerPage: 8,
  };

  const { data: products = [], isLoading } = useFetchProducts(productsParams);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex flex-col">
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
      <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products?.map(product => (
          <ProductListItem key={product.slug} {...product} />
        ))}
      </div>
      <div className="mb-5 self-end">
        <Pagination
          count={50}
          navigate={page => setCurrentPage(page)}
          pageNo={currentPage}
          pageSize={10}
        />
      </div>
    </div>
  );
};
export default ProductsList;
