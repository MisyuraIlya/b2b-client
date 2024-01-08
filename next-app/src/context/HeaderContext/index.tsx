"use client";

import { createContext, useContext } from 'react';
import { IHeaderContext, IHeaderProvider } from '@/types/store/header';

const HeaderContext = createContext<IHeaderContext>({})

export const HeaderProvider = ({ data, children }: IHeaderProvider) => {

  const value: IHeaderContext = {
    data,
  }
  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
}

export const useHeaderStore = (): IHeaderContext => {
  const context: IHeaderContext = useContext(HeaderContext)
  if (context === undefined) {
    throw new Error("useDiscover must be used within DiscoverContext");
  }
  return context;
}
