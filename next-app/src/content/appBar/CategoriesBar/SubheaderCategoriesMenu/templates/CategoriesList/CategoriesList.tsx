"use client"

import { useLocale } from "next-intl";
import { FC, useState } from "react";
import { Box, Button, ClickAwayListener, Drawer, Paper } from "@mui/material";
import CategorySubMenu from "@/components/CategorySubMenu/CategorySubMenu";
import Link from "@/components/Link";
import { useCategoriesStore } from "@/context/CategoriesContext";
import { getTranslation } from "@/utils/getTranslation";
import { Category } from "@/types/category";
import { SubheaderCategoriesMenuProps } from "../../types";
import { styles } from "./CategoriesList.styles";

const TIMEOUT_TO_SHOW_MS = 150
const TIMEOUT_TO_HIDE_MS = 350

const CategoriesList: FC<SubheaderCategoriesMenuProps> = () => {
  const { categories } = useCategoriesStore();
  const locale = useLocale()
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  let openTimeout: NodeJS.Timeout;
  let hideTimeout: NodeJS.Timeout;
  const hideCategories = () => {
    setActiveCategory(null)
  }
  const onCatHover = (activeCategory: Category) => {
    setActiveCategory(activeCategory)
  }

  const showSubCategories = (cat: Category | null) =>
    cat && cat.children && cat.children.length > 0

  const openSubcategories = (cat: Category) =>
    cat.children.length ? onCatHover(cat) : hideCategories();

  const openSubcategoriesWithDelay = (category: Category) => {
    openTimeout = setTimeout(
      () => openSubcategories(category),
      TIMEOUT_TO_SHOW_MS
    )
  }

  const hideCategoriesWithDelay = () => {
    if (openTimeout) {
      clearOpenTimeout()
    }
    hideTimeout = setTimeout(() => hideCategories(), TIMEOUT_TO_HIDE_MS)
  }

  const clearCloseTimeout = () => {
    clearTimeout(hideTimeout)
  }
  const clearOpenTimeout = () => {
    clearTimeout(openTimeout)
  }
  return (
    <ClickAwayListener onClickAway={hideCategoriesWithDelay}>
      <Drawer
        variant="permanent"
        anchor="top"
        onMouseLeave={hideCategoriesWithDelay}
        onMouseEnter={clearCloseTimeout}
        sx={styles.drawer}
      >
        <Paper elevation={0} sx={styles.top_categories}>
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory?.id
            const name = getTranslation(locale, cat.translations, cat.name);
            return (
              <Link key={cat.id} href={`/catalog/${cat.id}`}>
                <Button
                  disableRipple
                  onMouseEnter={() =>
                    openSubcategoriesWithDelay(cat)
                  }
                  sx={
                    isActive
                      ? [styles.category_btn, styles.active_category]
                      : styles.category_btn
                  }
                  onClick={hideCategories}
                >
                  {name}
                </Button>
              </Link>
            )
          })}
        </Paper>
        <Box sx={styles.subcategories_wrapper}>
          <Paper sx={styles.subcategories}>
            {showSubCategories(activeCategory) && (
              <CategorySubMenu
                key={1}
                parentCategoriesIds={[activeCategory!.id]}
                activeCategory={activeCategory!}
                onClick={hideCategories}
              />
            )}
          </Paper>
        </Box>
      </Drawer>
    </ClickAwayListener>
  )
}

export default CategoriesList;