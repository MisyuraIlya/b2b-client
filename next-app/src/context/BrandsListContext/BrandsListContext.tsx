"use client";

import { parseAsInteger, parseAsString, useQueryState, useQueryStates } from 'next-usequerystate';
import { createContext, useContext, useEffect } from 'react';
import { useApi } from '@/hooks/api/useApi';
import urls from '@/provider/api/urls';
import { IBrandsListContext, IBrandsListProvider } from '@/types/store/brandsList';

const BrandsListContext = createContext<IBrandsListContext>({
  handleChangePagination: () => {},
  page: 1,
  perPage: 25
})

export const BrandsListProvider = ({ brandsList, children }: IBrandsListProvider) => {
  const { 0: letter } = useQueryState('letter', parseAsString);
  const { 0: number } = useQueryState('number', parseAsString);
  const { 0: word } = useQueryState('word', parseAsString)

  const {0: pagination, 1: setPagination} = useQueryStates({
    page: parseAsInteger,
    perPage: parseAsInteger,
  }, { history: 'push', scroll: true });
  const { page, perPage } = pagination;

  const { data, isLoading } = useApi({
    entrypoint: urls.client.brandsList,
    searchParams: { page: page ?? 1, perPage: perPage ?? 25, word: word || undefined, letter: letter || undefined, number: number || undefined },
    fallbackData: brandsList
  })

  const handleChangePagination = (newPage: number, newPerPage: number) => {
    setPagination({ page: newPage, perPage: newPerPage });
  }

  const value: IBrandsListContext = {
    brandsList: data,
    page: page ?? brandsList.currentPage ?? 1,
    perPage: perPage ?? brandsList.perPage ?? 25,
    handleChangePagination,
    isLoading
  }
  return <BrandsListContext.Provider value={value}>{children}</BrandsListContext.Provider>
}

export const useBrandsListStore = (): IBrandsListContext => {
  const context: IBrandsListContext = useContext(BrandsListContext)
  if (context === undefined) {
    throw new Error("useDiscover must be used within DiscoverContext");
  }
  return context;
}
