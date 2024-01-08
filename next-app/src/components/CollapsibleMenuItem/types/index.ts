import { ReactNode } from "react"
import { IChildren } from "@/types/layout";
import { MuiStyle } from "@/types/mui";

export type CollapsibleMenuItemProps = IChildren & {
  title: ReactNode;
  accordionSx?: MuiStyle;
  accordionSummarySx?: MuiStyle;
  accordionDetailsSx?: MuiStyle;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpand?: (expanded: boolean) => void;
}