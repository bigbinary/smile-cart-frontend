import React, { useState } from "react";

import { useSearchedProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, Pagination } from "neetoui";
import { useTranslation } from "react-i18next";

import Thumbnail from "./Thumbnail";

import { Header } from "../commons";

const Products = () => {
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { t } = useTranslation();

  const debouncedSearchKey = useDebounce(searchKey, 300);

  const { data: products } = useSearchedProducts(
    debouncedSearchKey,
    currentPage
  );

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
        {products?.map(
          ({
            slug: key,
            id,
            offerPrice: price,
            name: title,
            slug,
            images: [imageUrl],
            availableQuantity,
          }) => (
            // eslint-disable-next-line react/jsx-key, react/react-in-jsx-scope
            <Thumbnail
              {...{ availableQuantity, id, imageUrl, key, price, slug, title }}
            />
          )
        )}
      </div>
      <div className="self-end">
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
export default Products;
