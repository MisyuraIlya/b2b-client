import dynamic from "next/dynamic";
import { FC } from "react";
import getComponent from "@/utils/getComponent";
import { IPageComponents } from "@/types/page";

const BrandsListDefault = dynamic(() => import("./templates/BrandsListDefault"));

const templates = {
  BrandsListDefault
}

const BrandsList: FC<IPageComponents> = async (props) => {
  const Component = getComponent(templates, props.template.name);

  return <Component {...props} />
}

export default BrandsList;