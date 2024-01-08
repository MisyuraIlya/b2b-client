"use client";

import { useSession } from 'next-auth/react';
import { createContext, useCallback, useContext, useReducer } from 'react';
import { useApi } from '@/hooks/api/useApi';
import urls from '@/provider/api/urls';
import { useCartStore } from '../CartContext/CartContext';
import { IProductContext, IProductProvider } from '@/types/store/product';
import { ProductPackage, ProductPrice } from '@/components/ProductCard/types';

import productReducer, { initialContext, initialState, SET_COUNT, SET_SELECTED_PACKAGE } from './productReducer';

const ProductContext = createContext<IProductContext>(initialContext)

export const ProductProvider = ({ product, children, isInView = true, productDetails }: IProductProvider) => {
  const { cart } = useCartStore();
  const { data: session } = useSession()
  const productCart = cart?.productCarts.find((cartItem) => cartItem.sku === (product ?? productDetails)?.sku) ?? null
  const [state, dispatch] = useReducer(productReducer, initialState(product ?? productDetails, productCart));
  const { isLoading, data } = useApi<ProductPrice>({ entrypoint: urls.client.priceList, params: [product?.id ?? productDetails?.id], skip: !isInView || !session, token: session?.token })
  const setCount = useCallback((count: string) => {
    dispatch({
      type: SET_COUNT,
      payload: count
    })
  }, []);

  const setSelectedPackage = useCallback((selectedPackage: ProductPackage | null) => {
    dispatch({
      type: SET_SELECTED_PACKAGE,
      payload: selectedPackage
    });
  }, []);

  const value: IProductContext = {
    ...state,
    product,
    productDetails,
    setCount,
    setSelectedPackage,
    price: data,
    isPriceLoading: isInView ? isLoading : true,
    productCart
  }
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductStore = (): IProductContext => {
  const context: IProductContext = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useDiscover must be used within DiscoverContext");
  }
  return context;
}
