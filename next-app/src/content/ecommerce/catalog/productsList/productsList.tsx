"use client"

import dynamic from "next/dynamic"
import { FC } from "react";
import getComponent from "@/utils/getComponent";
import { IPageComponents } from "@/types/page";

const ProductsListDefault = dynamic(() => import("./templates/ProductsListDefault"));

const templates = {
  ProductsListDefault
}

const ProductsList: FC<IPageComponents> = (props) => {
  const Component = getComponent(templates, props.template.name);
  return <Component {...props} />
}

export default ProductsList;