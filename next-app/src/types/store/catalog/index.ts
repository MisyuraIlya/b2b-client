import { IChildren } from '@/types/layout';
import { IPage } from '@/types/page';
import { ProductView } from '@/components/ProductCard/types';

export interface InitialCatalogState {
  someState: string;
  expandedCategories: Record<number, boolean>;
  listView: ProductView | null;
}

export interface ICatalogContext extends InitialCatalogState {
  setExpandedCategories: (id: number, expanded: boolean) => void;
  setListView: (view: ProductView) => void;
}

export interface ICatalogProvider extends IChildren { }