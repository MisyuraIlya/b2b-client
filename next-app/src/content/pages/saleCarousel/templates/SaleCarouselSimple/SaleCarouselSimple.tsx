"use client"
import { useLocale } from "next-intl";
import { FC } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import Actions from "@/components/Actions";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";
import { useApi } from "@/hooks/api/useApi";
import { IPageComponents } from "@/types/page";
import { ProductList } from "@/content/ecommerce/catalog/productsList/types";

import SaleCarouselSimpleSkeleton from "./SaleCarouselSimpleSkeleton";

const SaleCarouselSimple: FC<IPageComponents> = (props) => {
  const locale = useLocale();
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
  const slidesPerView = getSlidesPerView();
  const spaceBetweenSlides = 24;
  const filter = props.fetchParam[0].filter;

  const getSearchParams = () => {
    return filter.reduce((acc, cur) => ({ ...acc, [cur.property]: cur.value }), {})
  }

  const getTitle = () => {
    return props.contentReadies[0]?.title?.[0]?.[locale] ?? '';
  }

  const getAction = () => {
    const content = props.contentReadies[0];
    if (content && content.actionType) {
      return <Actions actionName={content.actionName} actionSource={content.actionSource} actionType={content.actionType} />
    }
  }

  const { data, error, isLoading } = useApi<ProductList>({ entrypoint: props.resource as string, searchParams: getSearchParams() });
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return <Carousel
    action={getAction()}
    title={getTitle()}
    slidesPerView={slidesPerView}
    spaceBetweenSlides={spaceBetweenSlides}
    data={data?.data ?? []}
    isLoading={isLoading}
    loadingComponent={<SaleCarouselSimpleSkeleton count={slidesPerView} gap={spaceBetweenSlides} />}
    renderItem={(item) => { return <ProductCard key={item.id} view="vertical" product={item} /> }}
  />
}

export default SaleCarouselSimple;