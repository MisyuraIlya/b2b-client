import dynamic from "next/dynamic"
import { FC } from "react"
import { Stack } from "@mui/material"
import getComponent from '@/utils/getComponent';
import { ComponentsMap } from "@/types/layout"
import { IPage, IPageComponents } from "@/types/page"

const contentReadySlider = dynamic(
  () => import("@/content/pages/ContentReadySlider")
)
const simpleGrid = dynamic(
  () => import("@/content/pages/SimpleGrid")
)
const saleCarousel = dynamic(
  () => import("@/content/pages/saleCarousel")
)
const awesomeGrid = dynamic(
  () => import("@/content/pages/AwesomeGrid")
)
const productsList = dynamic(
  () => import("@/content/ecommerce/catalog/productsList")
)
const Auth = dynamic(
  () => import("@/content/auth")
)
const productDetails = dynamic(
  () => import("@/content/ecommerce/productPage/productDetails")
)
const BrandsList = dynamic(
  () => import("@/content/ecommerce/BrandsList")
)
const CatalogHeader = dynamic(
  () => import("@/content/ecommerce/catalog/CatalogHeader")
)

const rootComponents: ComponentsMap<IPageComponents> = {
  contentReadySlider,
  simpleGrid,
  awesomeGrid,
  productsList,
  Auth,
  productDetails,
  saleCarousel,
  BrandsList,
  CatalogHeader
}

type ContentProps = {
  data: IPage
}

const Content: FC<ContentProps> = ({ data }) => {
  const components = data?.pageComponents?.map((pageComponent) => {
    const Component = getComponent(rootComponents, pageComponent.component.name);
    return <Component key={pageComponent.id} {...pageComponent} />
  })
  return <Stack maxWidth="100%" flexDirection="column" spacing={4}>{components}</Stack>
}

export default Content