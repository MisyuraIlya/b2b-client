import { IChildren } from '@/types/layout';
import { BrandList } from '@/content/ecommerce/BrandsList/types';
export interface IBrandsListContext {
  brandsList?: BrandList;
  page: number;
  perPage: number;
  handleChangePagination: (page: number, perPAge: number) => void;
  isLoading?: boolean;
}
export interface IBrandsListProvider extends IChildren {
  brandsList: BrandList
}
