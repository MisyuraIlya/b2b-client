import PageContent from "@/content/ecommerce/pageContent";
import { ProductListProvider } from "@/context/ProductListContext/ProductListContext";
import { clientData } from "@/provider/api";
import urls from "@/provider/api/urls";
import type { ProductList } from "@/content/ecommerce/catalog/productsList/types";

interface ICatalogPageProps {
  params: {
    locale: string,
    slug: string
  },
  searchParams: {
    page?: string,
    filters?: string,
    perPage?: string,
  }
}

export default async function CatalogPage({ params, searchParams }: ICatalogPageProps) {
  const { page, perPage, filters } = searchParams;
  const initialProductList = await clientData.getData<ProductList>(`${urls.client.productList}/${params.slug.split('-').join(',')}`, { page, perPage, filters: filters?.split(',') });
  return <ProductListProvider productList={initialProductList}>
    <PageContent />
  </ProductListProvider>
}