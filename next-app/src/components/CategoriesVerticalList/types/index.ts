import { Category } from "@/types/category"

export type CategoriesListProps = {
  categories: Category[];
  parentCategoriesIds: number[];
  defaultExpanded: string[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  isLink?: boolean;
}