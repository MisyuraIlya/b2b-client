import dynamic from "next/dynamic";
import { FC } from "react";
import getComponent from "@/utils/getComponent";
import { ComponentsMap } from "@/types/layout";
import { IPageComponents } from "@/types/page";
import { ContentReadySliderProps } from "./types";

const ContentReadySliderWow = dynamic(() => import('./templates/ContentReadySliderWow'));

const templates: ComponentsMap<ContentReadySliderProps> = {
  ContentReadySliderWow
}

const ContentReadySlider: FC<IPageComponents> = (props) => {
  const Component = getComponent(templates, props.template.name);

  return <Component {...props} />
}
export default ContentReadySlider;