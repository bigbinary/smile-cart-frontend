import React, { useState } from "react";

import { Header, PageLoader } from "components/commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty, without } from "ramda";
import { useTranslation } from "react-i18next";
import withTitle from "utils/withTitle";

import ProductListItem from "./ProductListItem";

const ProductsList = () => {
  const { t } = useTranslation();

  const [searchKey, setSearchKey] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const debouncedSearchKey = useDebounce(searchKey);

  const productsParams = {
    searchTerm: debouncedSearchKey,
    // page: Number(page) || DEFAULT_PAGE_INDEX,
    // pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [] } = {}, isLoading } =
    useFetchProducts(productsParams);

  const handleCartUpdate = slug => {
    setCartItems(prevCartItems => {
      if (prevCartItems.includes(slug)) {
        return without([slug], cartItems);
      }

      return [slug, ...cartItems];
    });
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen flex-col">
      <Header
        cartItemsCount={cartItems.length}
        shouldShowBackButton={false}
        title={t("title")}
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
        <NoData className="h-full w-full" title={t("noData")} />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem
              key={product.slug}
              {...product}
              isInCart={cartItems.includes(product.slug)}
              toggleCartPresence={() => handleCartUpdate(product.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default withTitle(ProductsList);
