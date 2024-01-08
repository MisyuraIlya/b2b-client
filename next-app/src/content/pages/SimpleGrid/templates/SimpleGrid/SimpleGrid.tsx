"use client"
import { useLocale } from "next-intl"
import { FC } from "react"
import { Box, Typography } from "@mui/material"
import DynamicMuiComponent from "@/components/DynamicMuiComponent/DynamicMuiComponent"
import GridItem from "@/components/GridItem"
import DigitradeManagerService from "@/provider/digitradeManager"
import getMuiProps from "@/utils/getMuiProps"
import {
  GridButtonHorizontalPosition,
  GridButtonVerticalPosition,
  GridTitleSubtitlePosition,
} from "@/types/layout"
import { ContentReadies, IPageComponents } from "@/types/page"
import { styles } from './SimpleGrid.styles';


const SimpleGrid: FC<IPageComponents> = (props) => {
  const locale = useLocale()

  const gridButtonHorizontalPosition = DigitradeManagerService.getEnumValue({
    component: props,
    enumName: "gridButtonHorizontalPosition",
  }) as GridButtonHorizontalPosition

  const gridButtonVerticalPosition = DigitradeManagerService.getEnumValue({
    component: props,
    enumName: "gridButtonVerticalPosition",
  }) as GridButtonVerticalPosition

  const gridTitleSubtitlePosition = DigitradeManagerService.getEnumValue({
    component: props,
    enumName: "gridTitleSubtitlePosition",
  }) as GridTitleSubtitlePosition

  const getComponent = (content: ContentReadies) => {
    return (
      <DynamicMuiComponent data={content.mui} key={content.id}>
        <GridItem
          {...content}
          gridButtonHorizontalPosition={gridButtonHorizontalPosition}
          gridButtonVerticalPosition={gridButtonVerticalPosition}
          gridTitleSubtitlePosition={gridTitleSubtitlePosition}
        />
      </DynamicMuiComponent>
    )
  }
  const content = props.contentReadies[0]
  if (!content) {
    return null
  }

  return (
    <Box key={props.id} {...getMuiProps(props.mui)}>
      {content.title.length ? (
        <Typography variant="h3" sx={styles.containerTitle}>
          {content.title[0][locale]}
        </Typography>
      ) : null}
      <DynamicMuiComponent data={content.mui} key={content.id}>
        {content.children?.map(getComponent)}
      </DynamicMuiComponent>
    </Box>
  )
}

export default SimpleGrid
