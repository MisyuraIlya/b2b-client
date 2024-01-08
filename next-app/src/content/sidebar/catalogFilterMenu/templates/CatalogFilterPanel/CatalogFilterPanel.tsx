"use client"
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { parseAsArrayOf, parseAsInteger, useQueryState } from "next-usequerystate";
import { FC, useEffect, useRef, useState } from "react";
import { Clear } from "@mui/icons-material";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useApi } from "@/hooks/api/useApi";
import urls from "@/provider/api/urls";
import FiltersGroup from "../../blocks/FiltersGroup";
import { FilterGroup } from "../../types";
import { styles } from "./CatalogFilterPanel.styles";

const CatalogFilterPanel: FC = () => {
  const t = useTranslations();
  const [filters, setFilters] = useQueryState('filters', parseAsArrayOf(parseAsInteger));
  const [_, setPage] = useQueryState('page', parseAsInteger);
  const [keepPreviousData, setKeepPreviousData] = useState(false);
  const [localFilters, setLocalFilters] = useState<number[]>(filters ?? []);
  const params = useParams();
  const paramsArray = (params.slug as string).split('-');
  const { data, isLoading } = useApi<Array<FilterGroup>>({
    entrypoint: urls.client.filterList,
    params: paramsArray,
    searchParams: filters ? { filters } : undefined,
    keepPreviousData
  });

  useEffect(() => {
    if (data) {
      const filterIds = data.reduce((acc, cur) => {
        return [...acc, ...cur.filters.map((filter) => filter.id)]
      }, [] as number[]);
      setLocalFilters((prev) => prev?.filter((item) => filterIds.includes(item)) ?? [])
    }
  }, [data])

  useEffect(() => {
    setKeepPreviousData(false)
  }, [params.slug])
  const handleChangeFilters = (filterId: number) => {
    setKeepPreviousData(true);
    if (localFilters?.includes(filterId)) {
      const result = localFilters.filter((id) => id !== filterId);
      setLocalFilters(result.length ? result : []);
    } else {
      setLocalFilters((prev) => [...prev, filterId])
    }
  }
  const clearFilters = (group: FilterGroup) => {
    setKeepPreviousData(true);
    const filterIds = group.filters.map((filter) => filter.id);
    const result = localFilters?.filter((item) => !filterIds.includes(item));
    setLocalFilters(result)
  }
  const clearAll = () => {
    setLocalFilters([])
  }
  const handleApply = () => {
    if (localFilters.length) {
      setFilters(localFilters)
    } else {
      setFilters(null);
    }
    setPage(null);
  }
  if (isLoading && !keepPreviousData) {
    return (
      <Box sx={styles.container}>
        <Skeleton sx={styles.skeleton} animation="wave" />
      </Box>
    )
  }
  return <Box sx={styles.container}>
    <Box sx={styles.title}>
      <Typography variant="h5">
        {t('SHOP_FILTER_TITLE')}
      </Typography>
      {localFilters.length ? (
        <Box sx={styles.clearAll} onClick={() => clearAll()}>
          <Clear />
          <Typography variant="body2">
            {t('SHOP_FILTER_BUTTON_CLEAR_ALL')}
          </Typography>
        </Box>
      ) : null}

    </Box>
    <Box sx={styles.filtersContainer}>
      {data?.map((filterGroup) => (
        <FiltersGroup filters={localFilters} key={filterGroup.id} data={filterGroup} clearFilters={clearFilters} handleChangeFilters={handleChangeFilters} />
      ))}
    </Box>
    <Button onClick={handleApply} sx={styles.applyBtn} variant="contained" color="primary">
      {t('SHOP_FILTER_BUTTON_APPLY')}
    </Button>
  </Box>
}

export default CatalogFilterPanel