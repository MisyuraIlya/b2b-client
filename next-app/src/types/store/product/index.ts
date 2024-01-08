import { ProductCart } from '../cart';
import { IChildren } from '@/types/layout';
import { Product, ProductPackage, ProductPrice } from '@/components/ProductCard/types';
import { ProductDetails } from '@/content/ecommerce/productPage/productDetails/types';


export interface InitialProductState {
  count: string;
  selectedPackage: ProductPackage | null;
}
export interface IProductContext extends InitialProductState {
  product?: Product | null;
  productDetails?: ProductDetails | null;
  setCount: (count: string) => void;
  setSelectedPackage: (selectedPackage: ProductPackage) => void;
  price?: ProductPrice;
  isPriceLoading: boolean;
  productCart: ProductCart | null;
}

export interface IProductProvider extends IChildren {
  product?: Product | null,
  productDetails?: ProductDetails | null;
  isInView?: boolean;
}