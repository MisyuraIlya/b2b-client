"use client"
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import CategoriesVerticalList from "@/components/CategoriesVerticalList";
import SearchField from "@/components/SearchField/SearchField";
import { useCategoriesStore } from "@/context/CategoriesContext";
import { SideBarComponent } from "@/types/page";
import { styles } from "./CatalogCategoriesDefault.styles";

const CatalogCategoriesDefault: FC<SideBarComponent> = () => {
  const t = useTranslations();
  const { categories } = useCategoriesStore();
  const { slug } = useParams();
  const slugArray = (slug as string).split('-');
  const activeSlug = slugArray[slugArray.length - 1];
  const [activeCategory, setActiveCategory] = useState(activeSlug)
  useEffect(() => {
    setActiveCategory(activeSlug)
  }, [activeSlug])
  return <Box sx={styles.container}>
    <SearchField
      sx={styles.searchField}
      onSearch={() => { }}
      placeholder={t('SHOP_INPUT_PLACEHOLDER_SEARCH')}
    />
    <CategoriesVerticalList activeCategory={activeCategory} setActiveCategory={setActiveCategory} categories={categories} parentCategoriesIds={[]} defaultExpanded={slugArray} />
  </Box>
}

export default CatalogCategoriesDefault