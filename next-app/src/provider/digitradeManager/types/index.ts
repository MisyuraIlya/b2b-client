import { ComponentGroupItem, TopBar, TopBarItem, TopBarItemType } from '@/types/initData';
import { IPageComponents } from "@/types/page"
export interface IGetEnumValueProps {
  component: IPageComponents
  enumName: string
}
export interface IGetVariableValue {
  component: IPageComponents
  variableName: string
}
export interface IGetComponentByNameProps {
  components: IPageComponents[]
  name: string
}
export interface IGetNavbarComponentByTypeProps {
  topBarItems: TopBarItem[]
  type: TopBarItemType
}
export interface IGetComponentGroupItemByNameProps {
  components: ComponentGroupItem[]
  name: string
}
export interface IGetTopBarByNameProps {
  topBars: TopBar[]
  name: string
}
export interface IGetTopBarItemByName {
  topBar: TopBar
  name: string
}