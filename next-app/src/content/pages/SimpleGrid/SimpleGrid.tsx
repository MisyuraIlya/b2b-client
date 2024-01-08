"use client"
import dynamic from "next/dynamic";
import { FC } from "react";
import Container from "@/components/Container";
import getComponent from "@/utils/getComponent";
import { ComponentsMap } from "@/types/layout";
import { IPageComponents } from "@/types/page";

const SimpleGrid = dynamic(() => import('./templates/SimpleGrid'));

const templates: ComponentsMap<IPageComponents> = {
  SimpleGrid: SimpleGrid
}

const SimpleGridComponent: FC<IPageComponents> = (props) => {
  const Component = getComponent(templates, props.template.name);
  return <Container>
    <Component {...props} />
  </Container>
}
export default SimpleGridComponent;