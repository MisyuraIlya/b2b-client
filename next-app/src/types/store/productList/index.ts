import { IChildren } from '@/types/layout';
import type { ProductList } from '@/content/ecommerce/catalog/productsList/types';

export interface IProductListContext {
  productList?: ProductList,
  page: number;
  perPage: number;
  isLoading: boolean;
  error?: string;
  handleChangePagination: (page: number, perPage: number) => void;
}

export interface IProductListProvider extends IChildren {
  productList?: ProductList;
}