import { ReactNode } from "react";
import { Mui } from "@/types/page";

export type DynamicMuiComponentProps = {
  data?: Mui; 
  children?: ReactNode;
  onClick?: () => void;
}
