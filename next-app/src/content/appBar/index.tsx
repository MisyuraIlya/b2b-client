"use client"
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { AppBar } from '@mui/material';
import { useHeaderStore } from '@/context/HeaderContext';
import getComponent from '@/utils/getComponent';
import { TopBar } from "@/types/initData";
import { ComponentsMap } from "@/types/layout";

const HeaderToolbar = dynamic(() => import("@/content/appBar/HeaderToolbar"));
const CategoriesBar = dynamic(() => import("@/content/appBar/CategoriesBar"));

const components: ComponentsMap<TopBar> = {
  appBar: HeaderToolbar,
  categoriesBar: CategoriesBar
}

const AppBarComponent: FC = () => {
  const { data } = useHeaderStore();
  if (!data) {
    return;
  }
  const { topBars } = data;
  return(
    <AppBar position="sticky" id="header">
      {topBars.map((topBar) => {
        const Component = getComponent(components, topBar.name);
        return <Component key={topBar.id} {...topBar} />
      })}
    </AppBar>
  )
}

export default AppBarComponent;