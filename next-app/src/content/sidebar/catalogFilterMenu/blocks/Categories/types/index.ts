import { Category } from "@/types/category"

export type CategoriesProps = {
  data: Category[];
  selectedCategory: number | null;
  handleChangeFilters: (categoryId: number | null) => void;
}