import { IPageComponents } from "@/types/page";

export type BrandsListDefaultProps = IPageComponents;

export type BrandsListFiltersProps = {
  handleChangeAlphabet: (val: string) => void;
}