import { GridSize } from "@mui/material"
import { Mui } from "@/types/page";

export default function getMuiProps(mui?: Mui | null) {
  if (!mui) {
    return {}
  }
  return {
    container: mui.container || undefined,
    sx: Array.isArray(mui.sx) ? undefined : mui.sx?.body,
    item: mui.item || undefined,
    spacing: mui.container ? mui.spacing : undefined,
    xs: mui.item ? mui.xs : undefined as boolean | GridSize | undefined,
    md: mui.item ? mui.md : undefined as boolean | GridSize | undefined
  }
}