"use client"
import dynamic from "next/dynamic";
import { FC } from "react";
import Container from "@/components/Container";
import getComponent from "@/utils/getComponent";
import { ComponentsMap } from "@/types/layout";
import { IPageComponents } from "@/types/page";

const SaleCarouselSimple = dynamic(() => import('./templates/SaleCarouselSimple'));

const templates: ComponentsMap<IPageComponents> = {
  SaleCarouselSimple
}

const SaleCarousel: FC<IPageComponents> = (props) => {
  const filter = props.fetchParam[0]?.filter;
  const resource = props.resource;
  if (!filter || !resource) {
    return null;
  }
  const Component = getComponent(templates, props.template.name);
  return <Container>
    <Component {...props} />
  </Container>
}
export default SaleCarousel;