"use client"
import { useParams } from "next/navigation";
import { usePathname } from "next-intl/client";
import { parseAsArrayOf, parseAsInteger, useQueryState } from "next-usequerystate";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { useApi } from "@/hooks/api/useApi";
import urls from "@/provider/api/urls";
import Categories from "../../blocks/Categories";
import FiltersGroup from "../../blocks/FiltersGroup";
import { MuiStyle } from "@/types/mui";
import { FilterGroup, FiltersWithCategories } from "../../types";
import { styles } from "./CatalogFilterDefault.styles";

const CatalogFiltersDefault: FC = () => {
  const pathname = usePathname();
  const [topOffset, setTopOffset] = useState(0);
  const [filtersOffset, setFiltersOffset] = useState(0);
  const filtersRef = useRef<HTMLDivElement>(null)
  const [filters, setFilters] = useQueryState('filters', parseAsArrayOf(parseAsInteger));
  const [category, setCategory] = useQueryState('category', parseAsInteger);
  const { 1: setPage } = useQueryState('page', parseAsInteger);
  const [keepPreviousData, setKeepPreviousData] = useState(false);
  const params = useParams();
  const paramsArray = (params.slug as string).split('-');
  const getUrl = () => {
    if (pathname.includes('search')) {
      return urls.client.searchFiltersByWord
    }
    if (pathname.includes('brand')) {
      return urls.client.searchBrandFiltersByWord
    }
    return urls.client.filterList;
  }
  const { data, isLoading } = useApi<Array<FilterGroup> | FiltersWithCategories>({
    entrypoint: getUrl(),
    params: paramsArray,
    searchParams: { filters: filters ?? undefined, category: category ?? undefined },
    keepPreviousData
  });
  useEffect(() => {
    const containerOffset = document?.getElementById('header')?.clientHeight ?? 0;
    setTopOffset(containerOffset);
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      if (filtersRef.current) {
        setFiltersOffset(filtersRef.current.offsetTop - window.scrollY);
      }
    }
    document.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading])
  const topOffsetSx: MuiStyle = { top: (theme) => `calc(${topOffset}px + ${theme.spacing(3)})` };
  const filtersSx: MuiStyle = { maxHeight: (theme) => `calc(100vh - (${filtersOffset}px + ${theme.spacing(2)}))` };

  const processedData = useMemo(() => {
    if (!data) {
      return {
        filters: [],
        categories: []
      }
    }
    if ('filters' in data) {
      return data;
    }
    return {
      filters: data,
      categories: []
    }
  }, [data])
  useEffect(() => {
    const filterIds = processedData.filters.reduce((acc, cur) => {
      return [...acc, ...cur.filters.map((filter) => filter.id)]
    }, [] as number[]);

    setFilters((prev) => {
      const newFilters = prev?.filter((item) => filterIds.includes(item));
      if (newFilters?.length) {
        return newFilters
      }
      return null
    })
  }, [processedData.filters]);

  const handleChangeCategory = (categoryId: number | null) => {
    setKeepPreviousData(true);
    setCategory(categoryId);
  }

  useEffect(() => {
    setKeepPreviousData(false)
  }, [params.slug])
  const handleChangeFilters = (filterId: number) => {
    setKeepPreviousData(true);
    if (filters?.includes(filterId)) {
      const result = filters.filter((id) => id !== filterId);
      setFilters(result.length ? result : null);
    } else {
      setFilters([...(filters ?? []), filterId])
    }
    setPage(null);
  }
  const clearFilters = (group: FilterGroup) => {
    setKeepPreviousData(true);
    const filterIds = group.filters.map((filter) => filter.id);
    const result = filters?.filter((item) => !filterIds.includes(item));
    setFilters(result?.length ? result : null)
  }
  if (isLoading && !keepPreviousData) {
    return (
      <Box sx={[styles.container, topOffsetSx]}>
        <Skeleton sx={styles.skeleton} animation="wave" />
      </Box>
    )
  }
  return <Box sx={[styles.container, topOffsetSx]} ref={filtersRef}>
    <Box sx={[styles.filtersContainer, filtersSx]}>
      {processedData.categories.length ? (
        <Categories data={processedData.categories} selectedCategory={category} handleChangeFilters={handleChangeCategory} />
      ) : null}
      {processedData.filters.map((filterGroup) => (
        <FiltersGroup filters={filters} key={filterGroup.id} data={filterGroup} clearFilters={clearFilters} handleChangeFilters={handleChangeFilters} />
      ))}
    </Box>
  </Box>
}

export default CatalogFiltersDefault