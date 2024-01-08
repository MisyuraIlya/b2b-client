"use client";

import { createContext, useContext, useReducer } from 'react';
import categoriesReducer, { initialContext, initialState } from '@/context/CategoriesContext/categoriesReducer';
import { CategoriesContext, ICategoriesProvider } from '@/types/store/categories';

const CategoriesStoreContext = createContext<CategoriesContext>(initialContext)

export const CategoriesProvider = ({ children, categories }: ICategoriesProvider) => {

  const [state, dispatch] = useReducer(categoriesReducer, initialState);

  const setSomeState = (record: string) => {
    dispatch({
      type: "SET_SOME_STATE",
      payload: {
        data: record
      }
    })
  }
  const value: CategoriesContext = {
    ...state,
    categories,
  }
  return <CategoriesStoreContext.Provider value={value}>{children}</CategoriesStoreContext.Provider>
}

export const useCategoriesStore = (): CategoriesContext => {
  const context: CategoriesContext = useContext(CategoriesStoreContext)
  if (context === undefined) {
    throw new Error("useDiscover must be used within DiscoverContext");
  }
  return context;
}
