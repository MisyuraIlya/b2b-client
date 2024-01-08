import {
  IGetComponentByNameProps,
  IGetComponentGroupItemByNameProps,
  IGetEnumValueProps,
  IGetNavbarComponentByTypeProps,
  IGetTopBarByNameProps,
  IGetTopBarItemByName,
  IGetVariableValue
} from './types'

const CONSTANTS = {
  APP_BAR: 'appBar',
  CATEGORIES_BAR: 'categoriesBar',
  SUBHEADER_CATEGORIES_MENU: 'subheaderCategoriesMenu',
  SUBHEADER_CATEGORIES_MENU_MOBILE: 'subheaderCategoriesMenuMobile',
}
const getEnumValue = <T = string | number>({ component, enumName }: IGetEnumValueProps): T => {
  // if it's overridden in digitrade manager in Pages --> Page Components --> [Some component]
  const clientSpecificEnumObj = component.pageComponentEnums.find(
    (el) => Object.keys(el)[0] === enumName
  )

  if (!clientSpecificEnumObj) {
    const enumObj = component.component.componentEnums.find(
      (el) => Object.keys(el)[0] === enumName
    )
    return enumObj?.[enumName] as T;
  }

  return clientSpecificEnumObj[enumName] as T;
}

const getVariableValue = <T>({ component, variableName }: IGetVariableValue): T => {
  const variable = component.variables.find((el) => el.name === variableName)
  return variable?.value as T
}
const getComponentByName = ({ components, name }: IGetComponentByNameProps) => {
  return components.find((el) => el.component.name === name)
}
const getNavbarComponentByType = ({ topBarItems, type }: IGetNavbarComponentByTypeProps) => {
  return topBarItems.find((el) => el.type === type)
}
const getComponentGroupItemByName = ({ components, name }: IGetComponentGroupItemByNameProps) => {
  return components.find((el) => el.component.name === name)
}
const getTopBarByName = ({ topBars, name }: IGetTopBarByNameProps) => {
  return topBars.find((el) => el.name === name)
}
const getTopBarItemByName = ({ topBar, name }: IGetTopBarItemByName) => {
  return topBar.topBarItems.find((el) => el.component?.name === name)
}
const getTopBarItemTemplateName = ({ topBarItem }: { topBarItem: any }) => {
  return topBarItem.template?.name
}

const DigitradeManagerService = {
  CONSTANTS,
  getEnumValue,
  getVariableValue,
  getComponentByName,
  getNavbarComponentByType,
  getComponentGroupItemByName,
  getTopBarByName,
  getTopBarItemByName,
  getTopBarItemTemplateName,
}
export default DigitradeManagerService;
