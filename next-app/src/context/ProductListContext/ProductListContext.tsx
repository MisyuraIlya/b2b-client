"use client";

import { useParams } from 'next/navigation';
import { usePathname } from 'next-intl/client';
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState, useQueryStates } from 'next-usequerystate';
import { createContext, useContext } from 'react';
import { useApi } from '@/hooks/api/useApi';
import urls from '@/provider/api/urls';
import { IProductListContext, IProductListProvider } from '@/types/store/productList';
import { ProductList, ProductListSearchParams } from '@/content/ecommerce/catalog/productsList/types';

const ProductListContext = createContext<IProductListContext>({
  productList: undefined,
  page: 1,
  perPage: 25,
  isLoading: false,
  handleChangePagination: () => { }
})

export const ProductListProvider = ({ productList, children }: IProductListProvider) => {
  const params = useParams();
  const pathname = usePathname();
  const [query] = useQueryState('query', parseAsString);
  const [category] = useQueryState('category', parseAsString);
  const getUrl = () => {
    if (pathname.includes('search')) {
      return urls.client.searchProductsByWord
    }
    if (pathname.includes('brand')) {
      return urls.client.searchProductsByBrand
    }
    return urls.client.productList;
  }
  const paramsArray = params.slug ? (params.slug as string).split('-') : [];
  const [pagination, setPagination] = useQueryStates({
    page: parseAsInteger,
    perPage: parseAsInteger,
  }, { history: 'push', scroll: true });
  const [filters] = useQueryState('filters', parseAsArrayOf(parseAsInteger));
  const { page, perPage } = pagination;

  const getSearchParams = () => {
    let searchParams: ProductListSearchParams = {};
    if (page) {
      searchParams.page = page;
    }
    if (perPage) {
      searchParams.perPage = perPage;
    }
    if (filters) {
      searchParams = { ...searchParams, filters }
    }
    if (category) {
      searchParams.category = category
    }
    return searchParams;
  }

  const { data, error, isLoading } = useApi<ProductList>({
    entrypoint: getUrl(),
    params: paramsArray,
    searchParams: getSearchParams(),
    fallbackData: productList
  });

  const getPerPage = () => {
    if (perPage) {
      return perPage;
    }
    return data?.perPage ?? 25;
  }
  const getPage = () => {
    if (page) {
      return page;
    }
    return data?.currentPage ?? 1;
  }
  const handleChangePagination = (newPage: number, newPerPage: number) => {
    setPagination({ page: newPage, perPage: newPerPage });
  }
  const value: IProductListContext = {
    productList: data,
    page: getPage(),
    perPage: getPerPage(),
    error: error?.message as string,
    isLoading,
    handleChangePagination
  }
  return <ProductListContext.Provider value={value}>{children}</ProductListContext.Provider>
}

export const useProductListStore = (): IProductListContext => {
  const context: IProductListContext = useContext(ProductListContext)
  if (context === undefined) {
    throw new Error("useDiscover must be used within DiscoverContext");
  }
  return context;
}
