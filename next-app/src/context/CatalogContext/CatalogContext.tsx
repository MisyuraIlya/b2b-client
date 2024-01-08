"use client";

import { createContext, useContext, useReducer } from 'react';
import catalogReducer, { initialContext, initialState } from '@/context/CatalogContext/catalogReducer';
import { ICatalogContext, ICatalogProvider } from '@/types/store/catalog';
import { ProductView } from '@/components/ProductCard/types';

const CatalogContext = createContext<ICatalogContext>(initialContext)

export const CatalogProvider = ({ children }: ICatalogProvider) => {
  const [state, dispatch] = useReducer(catalogReducer, initialState);

  const setSomeState = (record: string) => {
    dispatch({
      type: "SET_SOME_STATE",
      payload: {
        data: record
      }
    })
  }
  const setExpandedCategories = (id: number, expanded: boolean) => {
    dispatch({
      type: "SET_EXPANDED_CATEGORIES",
      payload: {
        id,
        expanded
      }
    })
  }
  const setListView = (view: ProductView) => {
    dispatch({
      type: "SET_LIST_VIEW",
      payload: view
    })
  }
  const value: ICatalogContext = {
    ...state,
    setExpandedCategories,
    setListView
  }
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export const useCatalogStore = (): ICatalogContext => {
  const context: ICatalogContext = useContext(CatalogContext)
  if (context === undefined) {
    throw new Error("useDiscover must be used within DiscoverContext");
  }
  return context;
}
