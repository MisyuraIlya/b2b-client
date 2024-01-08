"use client"
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, Button, ClickAwayListener, Drawer, Paper, Typography } from '@mui/material';
import CategorySubMenu from '@/components/CategorySubMenu';
import SearchField from '@/components/SearchField';
import { useCategoriesStore } from '@/context/CategoriesContext';
import { Category } from '@/types/category';
import { SubheaderCategoriesMenuProps } from '../../types';
import { styles } from './CategoriesBurger.styles';


const TIMEOUT_TO_SHOW_MS = 150
const TIMEOUT_TO_HIDE_MS = 350

const CategoriesBurger: FC<SubheaderCategoriesMenuProps> = () => {
  const { categories } = useCategoriesStore();
  const t = useTranslations();

  const [activeCategoriesList, setActiveCategoriesList] = useState<Category | null>(null)

  let openTimeout: NodeJS.Timeout;
  let hideTimeout: NodeJS.Timeout;

  const hideCategories = () => {
    setActiveCategoriesList(null)
  }

  const onCategoriesBurgerOpen = (category: Category) => {
    setActiveCategoriesList(category)
  }

  const onClickAway = () => {
    hideCategories()
  }

  const showSubCategories = (category: Category | null) =>
    Boolean(category && category.children?.length)

  const openCategories = () => {
    if (activeCategoriesList) {
      hideCategories();
    } else {
      onCategoriesBurgerOpen({ name: '', id: 0, children: categories, client: '', translations: [] } as Category)
    }
  }

  const openSubcategoriesWithDelay = () => {
    openTimeout = setTimeout(
      () => openCategories(),
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
    <ClickAwayListener onClickAway={onClickAway}>
      <Drawer
        variant="permanent"
        anchor="top"
        onMouseLeave={hideCategoriesWithDelay}
        onMouseEnter={clearCloseTimeout}
        sx={styles.drawer}
      >
        <Paper elevation={0} sx={styles.top_categories}>
          <Button
            variant="outlined"
            size="small"
            sx={styles.categories_btn}
            startIcon={<MenuIcon />}
            onClick={openSubcategoriesWithDelay}
          >
            <Typography variant="subtitle2">
              {t('SHOP_CATEGORIES_TITLE')}
            </Typography>
          </Button>
          <SearchField
            onSearch={() => { }}
            placeholder={t('SHOP_INPUT_PLACEHOLDER_SEARCH')}
            sx={styles.search_field}
          />
        </Paper>
        <Box sx={styles.subcategories_wrapper}>
          <Paper sx={styles.subcategories}>
            {showSubCategories(activeCategoriesList) && (
              <CategorySubMenu
                key={0}
                parentCategoriesIds={[]}
                activeCategory={activeCategoriesList!}
                onClick={hideCategories}
              />
            )}
          </Paper>
        </Box>
      </Drawer>
    </ClickAwayListener>
  )
}

export default CategoriesBurger
