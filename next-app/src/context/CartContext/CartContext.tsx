"use client";

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { createContext, useContext, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useApi } from '@/hooks/api/useApi';
import customer from '@/provider/api/customer';
import urls from '@/provider/api/urls';
import { useStore } from '../StoreContext';
import { Cart, ICartContext, ICartProvider, NewProduct, UpdateProduct } from '@/types/store/cart';


const CartContext = createContext<ICartContext>({
  cart: null,
  addProductToCart: async () => { },
  updateProductInCart: async () => { },
  deleteProductFromCart: async () => { },
  cartUpdateInProgress: {}
});

export const CartProvider = ({ children, carts: initialCarts }: ICartProvider) => {
  const t = useTranslations();
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const { client } = useStore();
  const [cartUpdateInProgress, setCartUpdateInProgress] = useState<ICartContext['cartUpdateInProgress']>({});
  const { data: carts = null, mutate } = useApi<Cart[] | null>({
    entrypoint: urls.customer.cart,
    fallbackData: session ? initialCarts : null,
    skip: !session,
    token: session?.token
  });
  const addProductToCart = async (product: Omit<NewProduct, 'client'>) => {
    setCartUpdateInProgress({ [product.sku]: true })
    try {
      await customer.fetch(urls.customer.addToCart, {
        method: 'POST',
        body: JSON.stringify({ ...product, client })
      }, session?.token)
      mutate();
      enqueueSnackbar(t('CART_MESSAGE_PRODUCT_ADDED'), { variant: 'success' })
    } catch (e) {
      const error = e as Error;
      enqueueSnackbar(error.message, { variant: 'error' });
      throw e;
    } finally {
      setCartUpdateInProgress({ [product.sku]: false })
    }

  }
  const updateProductInCart = async ({ sku, productCartId, ...rest }: UpdateProduct) => {
    setCartUpdateInProgress({ [sku]: true })
    try {
      await customer.fetch(urls.customer.updateCart(productCartId), {
        method: 'PUT',
        body: JSON.stringify(rest)
      }, session?.token)
      await mutate();
      enqueueSnackbar(t('CART_MESSAGE_CART_UPDATED'), { variant: 'success' })
    } catch (e) {
      const error = e as Error;
      enqueueSnackbar(error.message, { variant: 'error' });
      throw e;
    } finally {
      setCartUpdateInProgress({ [sku]: false })
    }
  }
  const deleteProductFromCart = async (productCartId: number) => {
    setCartUpdateInProgress({ [`${productCartId}`]: true })
    try {
      await customer.fetch(urls.customer.deleteProductFromCart(productCartId), {
        method: 'DELETE',
      }, session?.token)
      await mutate();
      enqueueSnackbar(t('CART_MESSAGE_PRODUCT_REMOVED'), { variant: 'success' })
    } catch (e) {
      const error = e as Error;
      enqueueSnackbar(error.message, { variant: 'error' });
      throw e
    } finally {
      setCartUpdateInProgress({ [`${productCartId}`]: false })
    }
  }

  const value: ICartContext = {
    cart: carts?.[0] ?? null,
    addProductToCart,
    updateProductInCart,
    deleteProductFromCart,
    cartUpdateInProgress
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCartStore = (): ICartContext => {
  const context: ICartContext = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useDiscover must be used within DiscoverContext");
  }
  return context;
}
