import { ReactNode } from "react"
import { MuiStyle } from "@/types/mui";

export type IconPopoverProps = {
  children: ReactNode;
  icon: ReactNode;
  sx?: MuiStyle;
}