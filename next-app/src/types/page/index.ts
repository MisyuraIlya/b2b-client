import {ReactNode} from 'react';
import * as Icons from '@mui/icons-material';
import { Menu } from '../initData';
import { MuiStyle } from '../mui';
export interface IPageComponents extends Identifier, IFetchParams {
  contentReady: boolean
  contentReadies: ContentReadies[]
  component: Component;
  pageComponentEnums: ComponentEnum[];
  template: Template;
  variables: Variable[]
  mui: Mui;
}

export interface IPage extends ICommonProps {
  translation: string
  title: string
  sidebars: Sidebar[]
  pageComponents: IPageComponents[]
}

export type IconsList = keyof typeof Icons;

export interface Identifier {
  id: number,
}

export interface ICommonProps extends Identifier {
  name: string,
}

export interface IFetchParams {
  link: string | null,
  dynamic: boolean | null,
  resource: string | null,
  fetchParam: {
    filter: {
      property: string;
      value: string;
    }[]
  }[],
}

type Widget = 'Menu' | 'Component';
interface ISidebarCommon extends Identifier, IFetchParams {
  type: 'Left' | 'Right'
  position: number
  widget: Widget
}

export type SideBarComponent = ISidebarCommon & {
  widget: 'Component';
  component: Component;
  template: Template
}
export type SideBarMenu = ISidebarCommon & {
  widget: 'Menu',
  menu: Menu
}

export type Sidebar = SideBarComponent | SideBarMenu;

export interface MediaSourceType {
  createdAt: string
  filePath: string
  id: number
  source: string
}

export interface Mui {
  component: 'Box' | 'Grid' | null;
  container: boolean;
  fixed: boolean;
  item: boolean;
  icon: IconsList;
  id: number;
  spacing: number;
  md?: number;
  xs?: number;
  sx: {
    body: MuiStyle
  } | [];
}

export interface ContentReadies {
  actionName: string | null;
  actionSource: string | null;
  actionType: 'button' | null;
  description: Record<string, string>[];
  form: boolean;
  formAction: null;
  formParams: [];
  id: number;
  subTitle: Record<string, string>[];
  title: Record<string, string>[];
  media: MediaSourceType;
  children?: ContentReadies[];
  mui: Mui;
}

export interface ComponentEnum {
  [key: string]: string | number
}

export interface Component {
  componentEnums: ComponentEnum[]
  description: string | null;
  dynamic: boolean;
  fetchParams: [];
  id: number;
  link: string | null;
  name: string;
  resource: string | null;
}

export interface Template {
  description: string | null
  id: number
  name: string
}

export enum VariableType {
  decimal = 'Decimal',
  boolean = 'Boolean',
  string = 'String',
  integer = 'Integer'
}

export type DecimalVariable = {
  name: string;
  type: VariableType.decimal;
  value: number;
}
export type BooleanVariable = {
  name: string;
  type: VariableType.boolean;
  value: boolean;
}
export type StringVariable = {
  name: string;
  type: VariableType.string;
  value: string;
}
export type IntegerVariable = {
  name: string;
  type: VariableType.integer;
  value: number;
}

type Variable = DecimalVariable | BooleanVariable | StringVariable | IntegerVariable;

export interface PageProps {
  children: ReactNode;
  params: { locale: string };
}
