"use client"
import dynamic from 'next/dynamic'
import { FC } from 'react'
import getComponent from '@/utils/getComponent'
import { TopBarItem } from '@/types/initData'
import { ComponentsMap } from '@/types/layout'
import { SubheaderCategoriesMenuProps } from './types'

const CategoriesList = dynamic(
  () => import('./templates/CategoriesList')
)
const CategoriesBurger = dynamic(
  () => import('./templates/CategoriesBurger')
)

const templates: ComponentsMap<SubheaderCategoriesMenuProps> = {
  CategoriesList,
  CategoriesBurger
}

const SubheaderCategoriesMenu: FC<TopBarItem> = (props) => {
  const Component = getComponent(templates, props.template.name)
  return <Component {...props} />
}

export default SubheaderCategoriesMenu
