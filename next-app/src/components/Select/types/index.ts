import { SelectChangeEvent } from "@mui/material";
import { MuiStyle } from "@/types/mui";

export type SelectProps = {
  onChange?: (event: SelectChangeEvent<any>) => void;
  disabled?: boolean;
  containerSx?: MuiStyle;
} & Options

type Options = StringOptions | NumberOptions;

type StringOptions = {
  options: Option<string>[];
  value: string;
}
type NumberOptions = {
  options: Option<number>[];
  value: number;
}

type Option<T> = {
  value: T;
  text: string;
}