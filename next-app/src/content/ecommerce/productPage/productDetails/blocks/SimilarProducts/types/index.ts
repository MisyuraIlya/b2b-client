import { Identifier } from "@/types/page";
import { Product } from "@/components/ProductCard/types"

export type SimilarProduct = Identifier & {
  position: number;
  product: Product;
}

export type SimilarProductsProps = {
  data: Array<SimilarProduct>;
}