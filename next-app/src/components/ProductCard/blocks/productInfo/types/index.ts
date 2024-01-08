import { MuiStyle } from "@/types/mui";
import { Product, ProductPrice } from "@/components/ProductCard/types";
import { Brand } from "@/content/ecommerce/productPage/productDetails/types";

export type ProductInfoProps = {
  sku?: string;
  barcode?: string;
  price?: ProductPrice;
  isPriceLoading: boolean;
  priceInfo?: string;
  brand?: Brand;
  sx?: MuiStyle;
}