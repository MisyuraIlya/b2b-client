import { Category } from "@/types/category"

export type CategorySubMenuProps = {
  activeCategory: Category;
  parentCategoriesIds: number[];
  onClick: () => void;
}