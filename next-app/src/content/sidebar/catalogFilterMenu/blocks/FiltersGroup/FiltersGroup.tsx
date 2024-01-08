"use client"
import { useLocale, useTranslations } from "next-intl";
import { FC, useState } from "react";
import { Clear } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import CollapsibleMenuItem from "@/components/CollapsibleMenuItem";
import { getTranslation } from "@/utils/getTranslation";
import { FilterGroupProps } from "./types";
import { styles } from "./FiltersGroup.styles";

const COLLAPSED_FILTERS_COUNT = 10;

const FiltersGroup: FC<FilterGroupProps> = ({ data, clearFilters, handleChangeFilters, filters }) => {
  const t = useTranslations();
  const locale = useLocale();
  const [showAll, setShowAll] = useState(false)
  const hasCheckedFilters = data.filters?.some((filter) => filters?.includes(filter.id));
  const getFiltersArray = () => {
    if (data.filters.length > COLLAPSED_FILTERS_COUNT) {
      if (showAll) {
        return data.filters;
      }
      return data.filters.slice(0, COLLAPSED_FILTERS_COUNT)
    }
    return data.filters;
  }
  const getFiltersCollapseAction = () => {
    if (data.filters.length > COLLAPSED_FILTERS_COUNT) {
      return (
        <Typography sx={styles.showAllLess} variant="body2" onClick={() => setShowAll(prev => !prev)}>
          {t(showAll ? 'SHOP_CONTENT_READY_BUTTON_LABEL_SHOW_LESS' : 'SHOP_CONTENT_READY_BUTTON_LABEL_SHOW_ALL')}
        </Typography>
      )
    }
  }
  return (
    <CollapsibleMenuItem
      accordionSx={styles.filtersGroup}
      accordionDetailsSx={styles.filters}
      defaultExpanded={hasCheckedFilters}
      accordionSummarySx={styles.formGroupTitle}
      title={
        <Box
          sx={styles.filterGroupName}
        >
          {getTranslation(locale, data.groupTranslations, data.groupName)}
          {hasCheckedFilters && (
            <Box
              sx={styles.clear}
              onClick={(e) => {
                e.stopPropagation();
                clearFilters(data)
              }}>
              <Clear />
              <Typography variant="body2">
                {t('SHOP_FILTER_BUTTON_CLEAR')}
              </Typography>
            </Box>
          )}
        </Box>
      }
    >
      <FormGroup>
        {getFiltersArray().map((filter) => (
          <FormControlLabel
            sx={styles.label}
            key={filter.id}
            control={<Checkbox sx={styles.checkbox} checked={filters?.includes(filter.id) ?? false} onChange={() => handleChangeFilters(filter.id)} />}
            label={`${getTranslation(locale, filter.translations, filter.name)} ${filter.productQuantity ? `(${filter.productQuantity})` : ''}`}
          />
        ))}
      </FormGroup>
      {getFiltersCollapseAction()}
    </CollapsibleMenuItem>
  )
}

export default FiltersGroup;