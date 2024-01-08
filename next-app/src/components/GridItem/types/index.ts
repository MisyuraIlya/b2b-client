import { GridButtonHorizontalPosition, GridButtonVerticalPosition, GridTitleSubtitlePosition } from "@/types/layout"
import { ContentReadies } from "@/types/page"

export type GridItemProps = ContentReadies & {
  gridButtonHorizontalPosition: GridButtonHorizontalPosition
  gridButtonVerticalPosition: GridButtonVerticalPosition
  gridTitleSubtitlePosition: GridTitleSubtitlePosition
}