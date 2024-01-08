"use client";
import { IAction } from '@/types/store';
import { ProductCart } from '@/types/store/cart';
import { InitialProductState, IProductContext } from '@/types/store/product';
import { Product } from '@/components/ProductCard/types';
import { ProductDetails } from '@/content/ecommerce/productPage/productDetails/types';

export const SET_COUNT = "SET_COUNT";
export const SET_SELECTED_PACKAGE = "SET_SELECTED_PACKAGE";

const emptyState: InitialProductState = {
  count: '',
  selectedPackage: null
}
export const initialContext: IProductContext = {
  ...emptyState,
  isPriceLoading: true,
  product: null,
  productDetails: null,
  setCount: () => { },
  setSelectedPackage: () => { },
  productCart: null
}
export const initialState = (product?: Product | ProductDetails | null, productCart?: ProductCart | null): InitialProductState => {
  if (product) {
    const getSelectedPackage = () => {
      const defaultPackage = product.productPackages?.[0] || null;
      if (productCart) {
        return product.productPackages?.find((productPackage) => productPackage.id === productCart.productPackage.id) ?? defaultPackage;
      }
      return defaultPackage;
    }
    const selectedPackage = getSelectedPackage();
    return {
      selectedPackage: selectedPackage,
      count: productCart ? `${productCart.quantity}` : `${selectedPackage?.package.step ?? selectedPackage?.step ?? ''}`
    }
  }
  return {
    selectedPackage: null,
    count: ''
  }
}
const productReducer = (state: InitialProductState, action: IAction) => {
  switch (action.type) {
    case SET_COUNT:
      return {
        ...state,
        count: action.payload
      }
    case SET_SELECTED_PACKAGE:
      return {
        ...state,
        selectedPackage: action.payload
      }
    default:
      throw new Error(`No case for type ${action.type} found in productReducer.`);
  }
}
export default productReducer