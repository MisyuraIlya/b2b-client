import { IChildren } from '@/types/layout';

export type NewProduct = {
  client: string;
  productId: number;
  sku: string;
  productPackageId: number;
  quantity: string;
  intermediatePrice: number;
  cartId?: number;
}
export type UpdateProduct = {
  productCartId: number;
  productPackage?: number;
  quantity?: number;
  sku: string;
  note?: string;
}

export type ProductCart = Omit<NewProduct, 'cartId' | 'productPackageId' | 'productId'> & {
  productPackage: { id: number };
  note: string | null;
  id: number;
}

export type Cart = {
  id: number;
  productCarts: Array<ProductCart>
}



export interface InitialCartState {
  carts: Cart[] | null;
}

export interface ICartContext {
  cart: Cart | null;
  addProductToCart: (product: Omit<NewProduct, 'client'>) => Promise<void>;
  updateProductInCart: (product: UpdateProduct) => Promise<void>;
  deleteProductFromCart: (productCartId: number) => Promise<void>;
  cartUpdateInProgress: {
    [key: string]: boolean
  };
}

export interface ICartProvider extends IChildren, InitialCartState { }