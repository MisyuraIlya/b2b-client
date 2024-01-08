import { MuiStyle } from "@/types/mui";

export type GlobalSearchProps = {
  link?: string | null;
  onClear?: () => void;
  sx?: MuiStyle;
  isDropdown?: boolean;
  autoFocus?: boolean;
  defaultValue?: string;
}