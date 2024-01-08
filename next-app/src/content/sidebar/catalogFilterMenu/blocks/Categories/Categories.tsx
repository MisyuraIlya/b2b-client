"use client"
import { useLocale, useTranslations } from "next-intl";
import { FC, useState } from "react";
import { Box, Typography } from "@mui/material";
import CollapsibleMenuItem from "@/components/CollapsibleMenuItem";
import { getTranslation } from "@/utils/getTranslation";
import { CategoriesProps } from "./types";
import { styles } from "../FiltersGroup/FiltersGroup.styles";

const COLLAPSED_FILTERS_COUNT = 9;

const Categories: FC<CategoriesProps> = ({ data, handleChangeFilters, selectedCategory }) => {
  const t = useTranslations();
  const locale = useLocale();
  const [showAll, setShowAll] = useState(false)
  const hasCheckedFilters = data?.some((category) => category.id === selectedCategory);
  const getFiltersArray = () => {
    if (data.length > COLLAPSED_FILTERS_COUNT) {
      if (showAll) {
        return data;
      }
      return data.slice(0, COLLAPSED_FILTERS_COUNT)
    }
    return data;
  }
  const getFiltersCollapseAction = () => {
    if (data.length > COLLAPSED_FILTERS_COUNT) {
      return (
        <Typography sx={[styles.showAllLess, styles.ml05]} variant="body2" onClick={() => setShowAll(prev => !prev)}>
          {t(showAll ? 'SHOP_CONTENT_READY_BUTTON_LABEL_SHOW_LESS' : 'SHOP_CONTENT_READY_BUTTON_LABEL_SHOW_ALL')}
        </Typography>
      )
    }
  }
  return (
    <CollapsibleMenuItem
      accordionSx={styles.filtersGroup}
      accordionDetailsSx={styles.nonFormControlContent}
      defaultExpanded={hasCheckedFilters}
      accordionSummarySx={styles.formGroupTitle}
      title={
        <Box
          sx={styles.filterGroupName}
        >
          {t('SHOP_CATEGORIES_TITLE')}
        </Box>
      }
    >
      <Typography
        sx={[styles.categoryLabel, !selectedCategory ? styles.activeCategory : null]}
        variant="body2"
        onClick={() => handleChangeFilters(null)}
      >
        {t('SHOP_LABEL_ALL_PRODUCTS')}
      </Typography>
      {getFiltersArray().map((filter) => (
        <Typography
          key={filter.id}
          sx={[styles.categoryLabel, selectedCategory === filter.id ? styles.activeCategory : null]}
          variant="body2"
          onClick={() => handleChangeFilters(filter.id)}
        >
          {getTranslation(locale, filter.translations, filter.name)}
        </Typography>
      ))}
      {getFiltersCollapseAction()}
    </CollapsibleMenuItem>
  )
}

export default Categories;