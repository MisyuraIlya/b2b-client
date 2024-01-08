import { ReactNode } from "react";
import { MuiStyle } from "@/types/mui"

export type ButtonLinkProps = {
  sx?: MuiStyle;
  link: string;
  text: string;
  startIcon?: ReactNode;
}