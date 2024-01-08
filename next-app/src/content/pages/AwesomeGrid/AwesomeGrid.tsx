"use client"
import dynamic from "next/dynamic";
import { FC } from "react";
import Container from "@/components/Container";
import DigitradeManagerService from "@/provider/digitradeManager";
import getComponent from "@/utils/getComponent";
import { ComponentsMap } from "@/types/layout";
import { IPageComponents } from "@/types/page";

const AwesomeGridCustom = dynamic(() => import('./templates/AwesomeGridCustom'));

const templates: ComponentsMap<IPageComponents> = {
  AwesomeGridCustom: AwesomeGridCustom
}

const AwesomeGrid: FC<IPageComponents> = (props) => {
  const Component = getComponent(templates, props.template.name);
  const fullWidth = DigitradeManagerService.getVariableValue<boolean>({
    component: props,
    variableName: 'fullWidth'
  })
  return fullWidth ? <Component {...props} /> : (
    <Container>
      <Component {...props} />
    </Container>
  )
}
export default AwesomeGrid;