import { Category } from '@/types/category';
import { IChildren } from '@/types/layout';

export interface InitialCategoriesState {
  someState: string
}
export interface CategoriesContext extends InitialCategoriesState {
  categories: Category[];
}

export interface ICategoriesProvider extends IChildren {
  categories: Category[];
}