import PageContent from '@/content/ecommerce/pageContent';
import { ProductProvider } from '@/context/ProductContext/ProductContext';
import { clientData } from '@/provider/api';
import urls from '@/provider/api/urls';
import { ProductDetails } from '@/content/ecommerce/productPage/productDetails/types';

interface IProductPageProps {
  params: {
    locale: string,
    id: string
  }
}

export default async function ProductPage({ params }: IProductPageProps) {
  const product = await clientData.getData<ProductDetails>(`${urls.client.productPage}/${params.id}`);
  return <ProductProvider productDetails={product}>
    <PageContent />
  </ProductProvider>
}