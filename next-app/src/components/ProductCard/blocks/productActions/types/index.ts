import type { ProductTotalProps } from "@/components/ProductTotal";
import type { ProductPackage, ProductPrice } from "@/components/ProductCard/types";

export type ProductActionsProps = {
  productPrices: Pick<ProductTotalProps, 'fullPrice' | 'totalPrice'>
  packageVariants: Array<ProductPackage>;
  packageVariantsInfo?: string;
  onSubmit: () => void;
  price?: ProductPrice;
  onChangePackage: (val: ProductPackage) => void;
  selectedPackage: ProductPackage | null;
  productId: number;
  count: string;
  setCount: (count: string) => void;
  isPriceLoading: boolean;
  volume?: number;
  isInCart: boolean;
  isCartUpdating: boolean;
}
