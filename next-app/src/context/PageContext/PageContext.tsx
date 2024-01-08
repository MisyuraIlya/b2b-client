"use client";

import { createContext, useContext } from 'react';
import { IPageContext, IPageProvider } from '@/types/store/page';

const PageContext = createContext<IPageContext>({ page: null })

export const PageProvider = ({ page, children }: IPageProvider) => {
  const value: IPageContext = {
    page
  }
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export const usePageStore = (): IPageContext => {
  const context: IPageContext = useContext(PageContext)
  if (context === undefined) {
    throw new Error("useDiscover must be used within DiscoverContext");
  }
  return context;
}
