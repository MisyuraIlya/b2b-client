import { Translation } from "@/types/common";

export type AttributesListItemProps = {
  itemKeys?: Array<Translation>;
  itemValues?: Array<Translation>;
  defaultKey?: string | null;
  defaultValue?: string | null;
}