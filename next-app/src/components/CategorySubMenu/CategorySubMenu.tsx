"use client"
import { useLocale } from 'next-intl';
import { FC, useEffect, useState } from 'react';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import Link from "@/components/Link";
import { useStore } from '@/context/StoreContext';
import { getTranslation } from '@/utils/getTranslation';
import { Category } from '@/types/category';
import { CategorySubMenuProps } from './types';
import { styles } from './CategorySubMenu.styles';

const CategorySubMenu: FC<CategorySubMenuProps> = (
  {
    activeCategory,
    parentCategoriesIds,
    onClick
  }
) => {
  const locale = useLocale();
  const [activeCat, setActiveCat] = useState<Category | null>(null)
  useEffect(() => {
    setActiveCat(null);
  }, [activeCategory]);
  const { direction } = useStore();
  return (
    <>
      <MenuList sx={styles.list}>
        {activeCategory.children!.map((cat) => {
          const isSubCategoryOpened = cat.id === activeCat?.id;
          const name = getTranslation(locale, cat.translations, cat.name);
          return (
            <Link key={cat.id} href={`/catalog/${parentCategoriesIds.join('-')}-${cat.id}`}>
              <MenuItem
                disableRipple
                onMouseEnter={() => setActiveCat(cat)}
                onClick={onClick}
                sx={
                  isSubCategoryOpened
                    ? [styles.active_btn, styles.btn]
                    : styles.btn
                }
              >
                <ListItemText sx={isSubCategoryOpened ? styles.active_color : styles.category_name}>
                  {name}
                </ListItemText>

                {cat.children && cat.children.length > 0 && (
                  <ListItemIcon sx={isSubCategoryOpened ? styles.active_color : {}}>
                    <ChevronRightIcon sx={direction === 'rtl' ? styles.rtlIcon : {}} />
                  </ListItemIcon>
                )}
              </MenuItem>
            </Link>
          )
        })}
      </MenuList>
      {activeCat && Boolean(activeCat.children?.length) && (
        <CategorySubMenu
          parentCategoriesIds={[...parentCategoriesIds, activeCat.id]}
          activeCategory={activeCat}
          onClick={onClick}
        />
      )}
    </>

  )
}

export default CategorySubMenu
