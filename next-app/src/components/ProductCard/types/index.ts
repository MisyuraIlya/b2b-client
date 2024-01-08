import { GridSize } from "@mui/material";
import { Translations } from "@/types/common";
import { IImage } from "@/types/media";
import { Attribute, ProductLabel } from "@/content/ecommerce/productPage/productDetails/types";

export type ProductPackageUnit = {
  id: number;
  name: string;
  translations: {
    [key: string]: string
  }
}

export type ProductPackage = {
  id: number;
  unit: ProductPackageUnit;
  step: number;
  quantity: number;
  package: {
    id: number;
    name: string;
    sysName: string;
    step?: number;
    type: string;
    weighAble: boolean;
  }
}

export type Product = Translations & {
  id: number;
  barcode: string;
  brand: Translations | null;
  sku: string;
  defaultProduct: boolean;
  productCardMedia: IImage | null;
  position: number;
  title: string;
  productPackages: Array<ProductPackage>;
  productLabels: Array<ProductLabel>;
  volume: number;
  productAttributes: Array<{ attribute: Attribute }>
};

export type ProductView = 'vertical' | 'horizontal';

export type ProductCardProps = {
  product: Product;
  view: ProductView;
  listWidth?: number;
  gridSize?: GridSize;
}

export type ProductPrice = {
  basePrice: number;
  id: number;
  oldPrice: number | null;
  sku: string;
  stock: number;
}


export type ProductCardTemplateProps = {
  listWidth?: number;
}