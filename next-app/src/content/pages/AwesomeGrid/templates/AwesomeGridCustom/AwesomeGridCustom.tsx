"use client"
import { FC } from "react";
import DynamicMuiComponent from "@/components/DynamicMuiComponent/DynamicMuiComponent";
import GridItem from "@/components/GridItem";
import DigitradeManagerService from "@/provider/digitradeManager";
import {
  GridButtonHorizontalPosition,
  GridButtonVerticalPosition,
  GridTitleSubtitlePosition,
} from "@/types/layout";
import {
  ContentReadies,
  IPageComponents,
} from "@/types/page";

const AwesomeGridCustom: FC<IPageComponents> = (props) => {
  const gridButtonHorizontalPosition = DigitradeManagerService.getEnumValue({
    component: props,
    enumName: "gridButtonHorizontalPosition",
  }) as GridButtonHorizontalPosition;

  const gridButtonVerticalPosition = DigitradeManagerService.getEnumValue({
    component: props,
    enumName: "gridButtonVerticalPosition",
  }) as GridButtonVerticalPosition;

  const gridTitleSubtitlePosition = DigitradeManagerService.getEnumValue({
    component: props,
    enumName: "gridTitleSubtitlePosition",
  }) as GridTitleSubtitlePosition;

  const getComponent = (content: ContentReadies) => {
    return (
      <DynamicMuiComponent data={content.mui} key={content.id}>
        {content.children?.length ? (
          content.children?.map(getComponent)
        ) : (
          <GridItem
            {...content}
            gridButtonHorizontalPosition={gridButtonHorizontalPosition}
            gridButtonVerticalPosition={gridButtonVerticalPosition}
            gridTitleSubtitlePosition={gridTitleSubtitlePosition}
          />
        )}
      </DynamicMuiComponent>
    )
  }
  return (
    <DynamicMuiComponent key={props.id} data={props.mui}>
      {props.contentReadies.map(getComponent)}
    </DynamicMuiComponent>
  )
}

export default AwesomeGridCustom;
