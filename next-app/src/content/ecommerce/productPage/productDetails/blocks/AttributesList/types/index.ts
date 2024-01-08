import { Translations } from "@/types/common";
import { Identifier } from "@/types/page";
import { ProductAttribute, ProductCharacteristic, ProductCharacteristicGroup } from "../../../types"

export type AttributesListProps = {
  attributes: Array<ProductAttribute>;
  characteristics: Array<ProductCharacteristic>
}

export type CharacteristicGroup = {
  group: ProductCharacteristicGroup;
  characteristics: Array<
    Translations & Identifier & {
      value: string;
    }
  >
}

export type GroupedCharacteristics = {
  [key in string]: CharacteristicGroup
}