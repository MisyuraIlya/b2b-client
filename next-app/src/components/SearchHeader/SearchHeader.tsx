"use client"
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { useProductListStore } from "@/context/ProductListContext/ProductListContext";
import GlobalSearch from "../GlobalSearch";
import { SearchHeaderProps } from "./types";
import { styles } from "./SearchHeader.styles";

const SearchHeader: FC<SearchHeaderProps> = ({ defaultValue }) => {
  const { productList } = useProductListStore();
  const t = useTranslations()
  return (
    <Box>
      <GlobalSearch defaultValue={decodeURI(defaultValue)} sx={styles.search} isDropdown />
      <Typography sx={styles.title} variant="h4" >
        {t('SHOP_LABEL_SEARCH_ITEMS_FOUND', { count: productList?.totalProducts, search: decodeURI(defaultValue) })}
      </Typography>
    </Box>
  )
}

export default SearchHeader
