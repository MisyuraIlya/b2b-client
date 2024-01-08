import Content from "@/content";
import { BrandsListProvider } from "@/context/BrandsListContext/BrandsListContext";
import { clientData, clientManager } from "@/provider/api";
import urls from "@/provider/api/urls";
import { BrandList } from "@/content/ecommerce/BrandsList/types";

interface IBrandsPageProps {
  searchParams: {
    page?: string,
    perPage?: string,
  }
}

export default async function BrandsPage({ searchParams }: IBrandsPageProps) {
  const page = await clientManager.getPage(urls.pages.brands);
  const brandsList = await clientData.getData<BrandList>(urls.client.brandsList, searchParams);
  return <BrandsListProvider brandsList={brandsList}>
    <Content data={page} />
  </BrandsListProvider>
}