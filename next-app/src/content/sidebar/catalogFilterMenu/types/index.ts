import { Category } from "@/types/category";
import { Translation, Translations } from "@/types/common";
import { Identifier } from "@/types/page";

export type Filter = Identifier & Translations & {
  name: string | null;
  productQuantity?: number;
}

export type FilterGroup = Identifier & {
  groupName: string;
  groupTranslations: Array<Translation>;
  filters: Array<Filter>
}

export type FiltersWithCategories = {
  filters: Array<FilterGroup>;
  categories: Category[];
}