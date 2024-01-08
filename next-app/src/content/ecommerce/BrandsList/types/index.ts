import { List, Translations } from "@/types/common";
import { ICommonProps } from "@/types/page";

export type Brand = Translations & ICommonProps & {
  image: string | null
}
export type BrandList = List<Brand> & {
  totalItems: number;
}