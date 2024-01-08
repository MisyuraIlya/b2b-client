import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { parseAsArrayOf, parseAsInteger, useQueryState } from "next-usequerystate";
import { FC, useMemo } from "react";
import { Clear, Close } from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";
import { useApi } from "@/hooks/api/useApi";
import urls from "@/provider/api/urls";
import { getTranslation } from "@/utils/getTranslation";
import { Filter, FilterGroup } from "@/content/sidebar/catalogFilterMenu/types";
import { styles } from './FiltersTags.styles';

const FiltersTags: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [filters, setFilters] = useQueryState('filters', parseAsArrayOf(parseAsInteger));
  const params = useParams();
  const paramsArray = (params.slug as string).split('-');
  const { data, isLoading } = useApi<Array<FilterGroup>>({
    entrypoint: urls.client.filterList,
    params: paramsArray,
    searchParams: filters ? { filters } : undefined,
    keepPreviousData: true
  });

  const handleDelete = (filterId: number) => {
    if (filters) {
      const newFilters = filters.filter((id) => id !== filterId);
      setFilters(newFilters.length ? newFilters : null)
    }
  }

  const filtersGroupArray = useMemo(() => {
    if (!data || !filters?.length) {
      return []
    }
    return data.reduce((acc, cur) => {
      const checkedFilters = cur.filters.filter((filter) => filters.includes(filter.id));
      if (checkedFilters.length) {
        return [...acc, {
          ...cur,
          filters: checkedFilters
        }]
      }
      return acc
    }, [] as FilterGroup[])
  }, [data, filters]);

  const getLabel = (filtersGroup: FilterGroup, filter: Filter) => {
    return <Box>
      <Typography sx={styles.filterName} variant="body2">
        {`${getTranslation(locale, filtersGroup.groupTranslations, filtersGroup.groupName)}: `}
      </Typography>
      <Typography sx={styles.filterValue} variant="body2">
        {` ${getTranslation(locale, filter.translations, filter.name)}`}
      </Typography>
    </Box>
  }

  return (
    filtersGroupArray.length ? (
      <Box sx={styles.container}>
        {filtersGroupArray.map((filtersGroup) => filtersGroup.filters.map((filter) => (
          <Chip
            deleteIcon={<Close sx={styles.deleteIcon} />}
            sx={styles.filter}
            key={filter.id}
            label={getLabel(filtersGroup, filter)}
            onDelete={() => handleDelete(filter.id)}
          />
        )))}
        <Box sx={styles.clearAll} onClick={() => setFilters(null)}>
          <Clear />
          <Typography variant="body2">
            {t('SHOP_FILTER_TAG_CLEAR_ALL')}
          </Typography>
        </Box>
      </Box>
    ) : null
  )
}

export default FiltersTags;