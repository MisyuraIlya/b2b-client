"use client"
import { useTranslations } from "next-intl";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Box, Grid } from "@mui/material";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { useCatalogStore } from "@/context/CatalogContext/CatalogContext";
import { usePageStore } from "@/context/PageContext/PageContext";
import { useProductListStore } from "@/context/ProductListContext/ProductListContext";
import DigitradeManagerService from "@/provider/digitradeManager";
import { IPageComponents } from "@/types/page";
import type { ProductView } from "@/components/ProductCard/types";
import { styles } from "./ProductsListDefault.styles";

import ProductListSkeleton from "./ProductListSkeleton";

const MAX_COLUMN_COUNT = 4;

const ProductsListDefault: FC<IPageComponents> = (props) => {
  const { listView, setListView } = useCatalogStore();
  const { page: catalogPage } = usePageStore();
  const { productList, page, perPage, isLoading, error, handleChangePagination } = useProductListStore();
  const t = useTranslations();
  const [listWidth, setListWidth] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setListWidth(listRef.current?.clientWidth ?? 0)
      }, 100)
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const productListView = DigitradeManagerService.getEnumValue<ProductView>({
    component: props,
    enumName: 'productListView'
  }) ?? 'vertical';

  const productView = listView || productListView;

  useEffect(() => {
    setListView(productView)
  }, [productView])

  const gridSize = useMemo(() => {
    if (listView === 'horizontal') {
      return
    }
    const leftSideBars = catalogPage?.sidebars.filter((sidebar) => sidebar.type === 'Left');
    const rightSideBars = catalogPage?.sidebars.filter((sidebar) => sidebar.type === 'Right');
    const leftSideBarOffset = Number(Boolean(leftSideBars?.length));
    const rightSideBarOffset = Number(Boolean(rightSideBars?.length));
    return 12 / (MAX_COLUMN_COUNT - (leftSideBarOffset + rightSideBarOffset))
  }, [listView, catalogPage?.sidebars])

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!productList || !productList.data.length) {
    return <div>Empty Category</div>;
  }
  const start = ((productList.currentPage - 1) * productList.perPage) + 1;
  const pageEnd = productList.currentPage * productList.perPage;
  const isMediumContainer = listWidth < 700;
  const isSmallContainer = listWidth < 610;
  const getPaginationSx = () => {
    if (isSmallContainer) {
      return styles.paginationSmall
    }
    if (isMediumContainer) {
      return styles.paginationMedium;
    }

    return null;
  }
  return (
    <Box sx={styles.container}>
      {isLoading ? <ProductListSkeleton count={perPage} gridSize={gridSize} /> : (
        <Grid spacing={3} ref={listRef} item container sx={styles.gridItem}>
          {productList.data.map((product) => <ProductCard gridSize={gridSize} listWidth={listWidth} key={product.id} product={product} view={listWidth && listWidth < 550 ? 'vertical' : productView} />)}
        </Grid>
      )}

      <Pagination
        label={t('SHOP_CATALOG_PAGINATION_SHOWING_PRODUCTS', { start, end: Math.min(pageEnd, productList.totalProducts), total: productList.totalProducts })}
        page={page}
        totalPages={productList.totalPages}
        perPageOptions={[25, 50, 100]}
        perPage={perPage}
        disabled={isLoading}
        sx={getPaginationSx()}
        changePagination={handleChangePagination}
      />
    </Box>
  )
}
export default ProductsListDefault;