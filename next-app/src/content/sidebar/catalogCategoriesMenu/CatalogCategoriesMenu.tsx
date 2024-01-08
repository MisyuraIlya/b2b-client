"use client"
import dynamic from "next/dynamic";
import { FC } from "react";
import getComponent from "@/utils/getComponent";
import { SideBarComponent } from "@/types/page";

const CatalogCategoriesDefault = dynamic(() => import("./templates/CatalogCategoriesDefault"));

const templates = {
  CatalogCategoriesDefault
}

const CatalogCategoriesMenu: FC<SideBarComponent> = (props) => {
  const Component = getComponent(templates, props.template.name)
  return <Component {...props} />
}

export default CatalogCategoriesMenu