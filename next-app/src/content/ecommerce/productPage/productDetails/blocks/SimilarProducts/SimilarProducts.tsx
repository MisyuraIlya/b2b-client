"use client"

import { useTranslations } from "next-intl";
import { FC } from "react";
import { Box, Theme, useMediaQuery } from "@mui/material";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";
import { SimilarProductsProps } from "./types";
import { styles } from './SimilarProducts.styles';

const SimilarProducts: FC<SimilarProductsProps> = ({ data }) => {
  const t = useTranslations()
  const isXl = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.up('xs'));
  const getSlidesPerView = () => {
    if (isXl) {
      return 4;
    }
    if (isLg) {
      return 3;
    }
    if (isMd) {
      return 2;
    }
    if (isXs) {
      return 1;
    }
    return 4
  }
  const slidesPerView = Math.min(getSlidesPerView(), data.length);
  return (
    <Box sx={styles.container}>
      <Carousel
        title={t('SHOP_PRODUCT_SIMILAR_PRODUCTS')}
        slidesPerView={slidesPerView}
        spaceBetweenSlides={24}
        data={data}
        renderItem={(item) => { return <ProductCard key={item.id} view="vertical" product={item.product} /> }}
      />
    </Box>

  )
}

export default SimilarProducts;