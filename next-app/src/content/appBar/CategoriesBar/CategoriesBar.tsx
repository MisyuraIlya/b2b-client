import dynamic from 'next/dynamic'
import { FC } from 'react'
import getComponent from '@/utils/getComponent'
import { TopBar } from '@/types/initData'

const SubheaderCategoriesMenu = dynamic(
  () => import('./SubheaderCategoriesMenu')
)
const components = {
  subheaderCategoriesMenu: SubheaderCategoriesMenu
}

const CategoriesBar: FC<TopBar> = async ({ topBarItems }) => {
  return <>
    {topBarItems.map((item) => {
      const Component = getComponent(components, item.component?.name);
      return <Component key={item.id} {...item} />
    })}
  </>
}

export default CategoriesBar
