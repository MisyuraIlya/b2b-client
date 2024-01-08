import { MuiStyle } from "@/types/mui"

export type NumericInputProps = {
  min: number
  max: number
  value: number | string
  placeholder?: string | boolean
  onChange: (val: number | string) => void;
  disabled?: boolean;
  sx?: MuiStyle;
}
