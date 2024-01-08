"use client"
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client"
import { FC } from "react";
import {
  GridViewOutlined as GridViewOutlinedIcon,
  ViewAgendaOutlined as ViewAgendaOutlinedIcon,
} from '@mui/icons-material'
import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Select from "@/components/Select";
import { useCatalogStore } from "@/context/CatalogContext/CatalogContext";
import { useProductListStore } from "@/context/ProductListContext/ProductListContext";
import { useCatalogBreadcrumbs } from "@/hooks/useCatalogBreadcrumbs";
import DigitradeManagerService from "@/provider/digitradeManager";
import { IPageComponents } from "@/types/page";
import { ProductView } from "@/components/ProductCard/types";
import { styles } from './CatalogHeaderDefault.styles'

const FiltersTags = dynamic(() => import('./blocks/FiltersTags'));
const SearchField = dynamic(() => import('@/components/SearchField'));
const Breadcrumbs = dynamic(() => import('@/components/Breadcrumbs'));
const Filters = dynamic(() => import('./blocks/Filters'));


const CatalogHeaderDefault: FC<IPageComponents> = (props) => {
  const t = useTranslations();
  const pathname = usePathname();
  const breadcrumbs = useCatalogBreadcrumbs(pathname);
  const { listView, setListView } = useCatalogStore();
  const { productList } = useProductListStore();

  const displayBreadcrumbs = DigitradeManagerService.getVariableValue<boolean>({
    component: props,
    variableName: 'displayBreadcrumbs'
  });
  const displaySearch = DigitradeManagerService.getVariableValue<boolean>({
    component: props,
    variableName: 'displaySearch'
  });
  const displaySorting = DigitradeManagerService.getVariableValue<boolean>({
    component: props,
    variableName: 'displaySorting'
  });
  const displayProductViewSelect = DigitradeManagerService.getVariableValue<boolean>({
    component: props,
    variableName: 'displayProductViewSelect'
  });
  const displayFilters = DigitradeManagerService.getVariableValue<boolean>({
    component: props,
    variableName: 'displayFilters'
  });
  const displayCount = DigitradeManagerService.getVariableValue<boolean>({
    component: props,
    variableName: 'displayCount'
  });

  return (
    <Box>
      {displayBreadcrumbs && <Breadcrumbs data={breadcrumbs} />}
      <Box sx={styles.header}>
        {displaySearch && (
          <SearchField
            onSearch={() => { }}
            placeholder={t('SHOP_INPUT_PLACEHOLDER_SEARCH')}
          />
        )}
        {displaySorting && (
          <Box sx={styles.sort}>
            <Typography variant="subtitle2">
              {t('SHOP_SELECT_LABEL_SORT_BY')}
            </Typography>
            <Select value={'name:asc'} containerSx={styles.select} options={[{ text: 'Product name', value: 'name:asc' }]} />
          </Box>
        )}
        <Box sx={styles.rightSide}>
          {displayCount && productList && (
            <Typography sx={styles.count} variant="body2">
              {`${t('CART_LABEL_PRODUCT_QTY')}: ${productList.totalProducts}`}
            </Typography>
          )}

          {displayProductViewSelect && (
            <ToggleButtonGroup
              exclusive
              sx={styles.productView}
              value={listView}
              onChange={(ev, val) => {
                if (val) {
                  setListView(val as ProductView)
                }
              }}
            >
              <ToggleButton
                value={'vertical'}
                sx={styles.toggleBtn}
              >
                <GridViewOutlinedIcon />
              </ToggleButton>
              <ToggleButton
                value={'horizontal'}
                sx={styles.toggleBtn}
              >
                <ViewAgendaOutlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          )}
          {displayFilters && (
            <Box sx={styles.filters}>
              <Filters />
            </Box>
          )}
        </Box>

      </Box>
      {displayFilters && (
        <FiltersTags />
      )}
    </Box>
  )
}

export default CatalogHeaderDefault