import {Component, ICommonProps, Identifier, IFetchParams, MediaSourceType, Mui, Template} from '@/types/page';

export interface InitData {
  clientDefines: ClientDefines;
  defines: Defines;
  topBars: TopBar[]
}
export interface ClientDefines {
  isClosed: boolean;
}
export interface Defines {
  VAT: number;
}
export interface TopBar extends ICommonProps {
  topBarItems: TopBarItem[];
  mui?: Mui;
}
export interface TopBarItem extends ICommonProps, IFetchParams {
  position: number;
  component: Component | null;
  componentGroup: ComponentGroup | null;
  media?: MediaSourceType;
  template: Template;
  type: TopBarItemType;
  menu: Menu | null;
  mui?: Mui;
}
export interface ComponentGroup extends ICommonProps {
  componentGroupItems: ComponentGroupItem[];
  mui?: Mui;
}
export interface ComponentGroupItem extends Identifier {
  link: string | null;
  position: number;
  template: Template;
  component: Component;
  mui?: Mui;
}
export type TopBarItemType = 'ImageLink' | 'ComponentGroup' | 'Menu' | 'Component';
export interface Menu extends ICommonProps {
  clientPages: ClientPage[];
  menuGroups: MenuGroup[];
  translation: string;
}
export interface ClientPage extends Identifier {
  path: string;
  position: number;
  translation: string;
}
export interface MenuGroup {
  clientPages: ClientPage[];
  translation: string;
  name: string;
  id: number;
}