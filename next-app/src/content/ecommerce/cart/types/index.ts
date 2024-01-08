import { Translations } from "@/types/common";
import { IImage } from "@/types/media";
import { ProductLabel } from "../../productPage/productDetails/types";
import { ProductPackage } from "@/components/ProductCard/types";

export type FullProductCart = {
  id: number;
  intermediatePrice: number;
  note: string | null;
  quantity: number;
  sku: string;
  product: Translations & {
    productLabels: Array<ProductLabel>;
    productPackages: Array<ProductPackage>;
    barcode: string;
    id: number;
    sku: string;
    thumb: string;
    title: string;
    volume: number;
    productImages: Array<IImage>
  };
  productPackage: {
    id: number;
  }
}

export type FullCart = Translations & {
  createdAt: string;
  id: number;
  productCarts: Array<FullProductCart>;
  type: number;
  status: number;
  updatedAt: string | null;
}