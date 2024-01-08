import dynamic from "next/dynamic";
import { FC } from "react";
import getComponent from "@/utils/getComponent";
import { IPageComponents } from "@/types/page";

const CatalogHeaderDefault = dynamic(() => import("./templates/CatalogHeaderDefault"));

const templates = {
  CatalogHeaderDefault
}


const CatalogHeader: FC<IPageComponents> = (props) => {
  const Component = getComponent(templates, props.template.name);
  return <Component {...props} />
}

export default CatalogHeader