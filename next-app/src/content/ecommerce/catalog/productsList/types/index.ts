import { List } from "@/types/common";
import { Product } from "@/components/ProductCard/types";

export type ProductList = List<Product> & {
  totalProducts: number;
}

export type ProductListSearchParams = {
  [key in string]?: Array<number> | number | string;
}