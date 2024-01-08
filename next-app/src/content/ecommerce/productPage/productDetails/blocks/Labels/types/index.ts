import { ChipProps } from "@mui/material";
import { MuiStyle } from "@/types/mui";
import { ProductLabel } from "../../../types"

export type LabelsProps = {
  data: Array<ProductLabel>;
  size?: ChipProps['size'];
  mode?: 'row' | 'column';
  sx?: MuiStyle;
}
export type LabelProps = {
  data: ProductLabel;
  size?: ChipProps['size'];
}