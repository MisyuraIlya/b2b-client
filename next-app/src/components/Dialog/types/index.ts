"use client"

import { IChildren } from "@/types/layout";
import { MuiStyle } from "@/types/mui";

export type DialogProps = IChildren & {
  title?: string;
  handleClose: () => void;
  open: boolean;
  containerSx?: MuiStyle;
}