import dynamic from "next/dynamic";
import { FC } from "react";
import getComponent from "@/utils/getComponent";
import { SideBarComponent } from "@/types/page";

const CatalogFilterDefault = dynamic(() => import("./templates/CatalogFilterDefault"));

const templates = {
  CatalogFilterDefault
}

const CatalogFilterMenu: FC<SideBarComponent> = (props) => {
  const Component = getComponent(templates, props.template.name)
  return <Component />
}

export default CatalogFilterMenu