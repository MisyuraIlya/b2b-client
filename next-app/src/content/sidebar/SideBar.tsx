"use client"
import dynamic from "next/dynamic";
import { FC } from "react";
import getComponent from "@/utils/getComponent";
import { ComponentsMap } from "@/types/layout";
import { Sidebar, SideBarComponent, SideBarMenu } from "@/types/page";

const catalogCategoriesMenu = dynamic(() => import('./catalogCategoriesMenu'));
const catalogFilterMenu = dynamic(() => import('./catalogFilterMenu'));
const sideBarComponents: ComponentsMap<SideBarComponent> = {
  catalogCategoriesMenu,
  catalogFilterMenu
}
const sideBarMenus: ComponentsMap<SideBarMenu> = {}

const SideBar: FC<Sidebar> = (props) => {
  if (props.widget === 'Menu') {
    const Component = getComponent(sideBarMenus, props.menu.name)
    return <Component {...props} />
  }

  const Component = getComponent(sideBarComponents, props.component.name);
  return <Component {...props} />
}

export default SideBar