"use client"
import dynamic from "next/dynamic";
import { FC } from "react";
import Container from "@/components/Container/Container";
import getComponent from "@/utils/getComponent";
import { IPageComponents } from "@/types/page";
import { styles } from './ProductDetails.styles';

const ProductDetailsDefault = dynamic(() => import("./templates/ProductDetailsDefault"));

const templates = {
  ProductDetailsDefault
}

const ProductDetails: FC<IPageComponents> = (props) => {
  const Component = getComponent(templates, props.template.name);
  return <Container sx={styles.container}>
    <Component {...props} />
  </Container>
}

export default ProductDetails