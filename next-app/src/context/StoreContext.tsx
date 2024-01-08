"use client";

import { usePathname } from 'next-intl/client';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import storeReducer, { initialContext, initialState } from '@/context/storeReducer';
import { InitialContext, IStoreProvider } from '@/types/store';

const StoreContext = createContext<InitialContext>(initialContext)

export const StoreProvider = ({ client, languages, direction, children }: IStoreProvider) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname)

  useEffect(() => () => {
    setPrevPathname(pathname)
  }, [pathname])

  const setSomeState = (record: string) => {
    dispatch({
      type: "SET_SOME_STATE",
      payload: {
        data: record
      }
    })
  }
  const value: InitialContext = {
    someState: state.someState,
    client,
    languages,
    direction,
    prevPathname
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = (): InitialContext => {
  const context: InitialContext = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useDiscover must be used within DiscoverContext");
  }
  return context;
}
