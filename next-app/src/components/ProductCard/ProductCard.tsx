"use client"
import { FC, useState } from "react";
import { InView } from 'react-intersection-observer';
import { Grid } from "@mui/material";
import { ProductProvider } from "@/context/ProductContext/ProductContext";
import getComponent from "@/utils/getComponent";
import { ProductCardProps } from "./types";

import HorizontalProductCard from './templates/HorizontalProductCard';
import VerticalProductCard from './templates/VerticalProductCard';

const templates = {
  vertical: VerticalProductCard,
  horizontal: HorizontalProductCard
}

const ProductCard: FC<ProductCardProps> = (props) => {
  const [isInView, setIsInView] = useState(false);

  const Component = getComponent(templates, props.view);
  return <ProductProvider product={props.product} isInView={isInView}>
    <Grid sx={props.view === 'horizontal' ? { width: '100%' } : null} lg={props.gridSize} item component={InView} threshold={0} triggerOnce onChange={setIsInView}>
      <Component
        key={props.product.id}
        listWidth={props.listWidth}
      />
    </Grid>
  </ProductProvider>
}

export default ProductCard;