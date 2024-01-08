"use client"

import { useLocale } from "next-intl"
import { useMemo } from "react"
import { useCategoriesStore } from "@/context/CategoriesContext"
import { getTranslation } from "@/utils/getTranslation"
import { Category } from "@/types/category"
import { BreadcrumbsItem } from "@/components/Breadcrumbs/types"

function searchTree(element: Category, id: string, path: Category[]) {
  let result: Category[] = [];
  if (`${element.id}` === id) {
    return path;
  } else if (element.children.length) {
    for (let i = 0; i < element.children.length; i++) {
      const categories = searchTree(element.children[i], id, [...path, element.children[i]]);
      if (categories.length) {
        result = categories;
      }
    }
    return result;
  }
  return result;
}

export const useCatalogBreadcrumbs = (
  pathname: string
): BreadcrumbsItem[] => {
  const { categories } = useCategoriesStore();
  const locale = useLocale();

  const breadcrumbs = useMemo(() => {
    let result: BreadcrumbsItem[] = [];
    if (!pathname || !pathname.includes('catalog')) {
      return result;
    }
    const params = pathname.split('/').pop();
    const paramsArray = params?.split('-') ?? [];
    let categoriesPath: Category[] = [];
    if (paramsArray.length) {
      for (let i = 0; i < categories.length; i++) {
        const result = searchTree(categories[i], paramsArray[paramsArray.length - 1], [categories[i]]);
        if (result.length) {
          categoriesPath = result;
          break;
        }
      }
    }
    result = categoriesPath.reduce((acc, cur, index) => {
      if (acc.length) {
        return [
          ...acc,
          {
            link: `${acc[index - 1].link}-${cur.id}`,
            text: getTranslation(locale, cur?.translations, cur?.name)
          }
        ]
      }
      return [
        {
          link: `/catalog/${cur.id}`,
          text: getTranslation(locale, cur?.translations, cur?.name)
        }
      ];
    }, [] as BreadcrumbsItem[])

    return result;
  }, [categories, pathname, locale])

  return breadcrumbs
}