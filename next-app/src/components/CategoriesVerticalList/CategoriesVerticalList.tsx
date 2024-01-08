"use client"
import { useLocale } from "next-intl";
import { FC, MouseEvent } from "react";
import { List, ListItem, Typography } from "@mui/material";
import Link from "@/components/Link";
import { useCatalogStore } from "@/context/CatalogContext/CatalogContext";
import { getTranslation } from "@/utils/getTranslation";
import CollapsibleMenuItem from "../CollapsibleMenuItem/CollapsibleMenuItem";
import { Category } from "@/types/category";
import { CategoriesListProps } from "./types";
import { styles } from './CategoriesVerticalList.styles';

const CategoriesVerticalList: FC<CategoriesListProps> = ({ categories, parentCategoriesIds, defaultExpanded, activeCategory, setActiveCategory, isLink = true }) => {
  const locale = useLocale();
  const { expandedCategories, setExpandedCategories } = useCatalogStore();
  const handleExpanded = (id: number, expanded: boolean) => {
    setExpandedCategories(id, expanded);
  }
  const handleLinkClick = (e: MouseEvent, id: number) => {
    setActiveCategory(`${id}`);
    e.stopPropagation()
  }
  const getCategoryLink = (category: Category) => {
    const name = getTranslation(locale, category.translations, category.name);
    const isActive = activeCategory === `${category.id}`;
    if (isLink) {
      return (
        <Link
          onClick={(e) => handleLinkClick(e, category.id)}
          href={`/catalog/${[...parentCategoriesIds, category.id].join('-')}`}
        >
          <Typography
            sx={[
              styles.category,
              !parentCategoriesIds.length ? styles.rootCategory : null,
              isActive ? styles.activeCategory : null
            ]}
          >
            {name}
          </Typography>
        </Link>
      )
    }
    return (
      <Typography
        onClick={(e) => handleLinkClick(e, category.id)}
        sx={[
          styles.category,
          !parentCategoriesIds.length ? styles.rootCategory : null,
          isActive ? styles.activeCategory : null
        ]}
      >
        {name}
      </Typography>
    )
  }
  return <List sx={styles.list}>
    {categories.map((category) => {
      if (category.children?.length) {
        return (
          <ListItem sx={styles.listItem} key={category.id}>
            <CollapsibleMenuItem
              onExpand={(expanded) => {
                handleExpanded(category.id, expanded);
              }}
              defaultExpanded={defaultExpanded.includes(`${category.id}`)}
              accordionSx={parentCategoriesIds.length ? styles.accordionSubCategory : {}}
              accordionDetailsSx={styles.accordionDetailsSubCategory}
              expanded={expandedCategories[category.id]}
              title={getCategoryLink(category)}
            >
              <CategoriesVerticalList activeCategory={activeCategory} setActiveCategory={setActiveCategory} defaultExpanded={defaultExpanded} categories={category.children} parentCategoriesIds={[...parentCategoriesIds, category.id]} />
            </CollapsibleMenuItem>
          </ListItem>
        )
      }
      return (
        <ListItem sx={[styles.listItem, styles.nonCollapsibleCategory, parentCategoriesIds.length ? styles.accordionSubCategory : null]} key={category.id}>
          {getCategoryLink(category)}
        </ListItem>
      )
    })}
  </List>
}

export default CategoriesVerticalList;