import { Translation, Translations } from "@/types/common";
import { IImage, MediaObject } from "@/types/media";
import { Identifier } from "@/types/page";
import { Product } from "@/components/ProductCard/types";

export type AttributeGroup = Identifier & Translations & {
  hidden: boolean;
  name: string;
  showOnFilter: boolean;
  showOnProductPage: boolean;
}

export type Attribute = Identifier & Translations & {
  name: string | null;
  sku: string;
  attributeGroup: AttributeGroup;
}

export type ProductCharacteristicGroup = Identifier & Translations & {
  position: number;
}

export type ProductCharacteristic = Identifier & Translations & {
  position: number;
  value: string;
  productCharacteristicGroup: ProductCharacteristicGroup;
}

export type ProductFile = Identifier & MediaObject & {
  name: string;
  position: number;
}

export type ProductLink = Identifier & Translations & MediaObject & {
  position: number;
  url: string;
}

export type ProductTableColumn = Array<Translation>;

export type ProductTable = Identifier & Translations & {
  columns: Array<ProductTableColumn>;
  values: Array<Array<string>>;
}

export type ProductTab = Translations & {
  textTranslations: Array<Translation>;
}

export type ProductAttribute = Identifier & {
  sku: string;
  attribute: Attribute
}

export type ProductLabel = Identifier & {
  position: number;
  sku: string;
  label: Identifier & Translations & {
    bgColor: string;
    name: string;
    textColor: string;
  }
}

export type Brand = Identifier & Translations & {
  createdAt: string;
  position: number;
  name: string | null;
  updatedAt: string;
}

export type ProductCategory = Translations & {
  id: number;
  name: string;
  parent: ProductCategory | null;
}

export type ProductDetails = Product & {
  category: ProductCategory | null;
  hidden: boolean;
  volume?: number;
  status: number;
  search: string;
  syncAt: string;
  createdAt: string;
  updatedAt: string;
  brand?: Brand;
  productImages: IImage[];
  productAttributes: Array<ProductAttribute>;
  productLabels: Array<ProductLabel>;
  textTranslations: Array<Translation>;
  productCharacteristics: Array<ProductCharacteristic>;
  productFiles: Array<ProductFile>;
  productLinks: Array<ProductLink>;
  productTables: Array<ProductTable>;
  productTabs: Array<ProductTab>
}