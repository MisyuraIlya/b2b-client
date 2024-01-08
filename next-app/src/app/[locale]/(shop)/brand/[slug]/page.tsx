import { Grid } from "@mui/material";
import BrandHeader from "@/components/BrandHeader";
import Container from "@/components/Container";
import PageContent from "@/content/ecommerce/pageContent";
import SideBar from "@/content/sidebar";
import { CatalogProvider } from "@/context/CatalogContext/CatalogContext";
import { PageProvider } from "@/context/PageContext/PageContext";
import { ProductListProvider } from "@/context/ProductListContext/ProductListContext";
import { clientData, clientManager } from "@/provider/api";
import urls from "@/provider/api/urls";
import type { ProductList } from "@/content/ecommerce/catalog/productsList/types";
import { Brand } from "@/content/ecommerce/productPage/productDetails/types";

interface ICatalogPageProps {
  params: {
    locale: string,
    slug: string
  },
  searchParams: {
    page?: string,
    filters?: string,
    perPage?: string,
    category?: string
  }
}

const GRID_COLUMN_XL = 3;

export default async function BrandPage({ params, searchParams }: ICatalogPageProps) {
  const pageData = await clientManager.getPage(urls.pages.brand);
  const leftSideBar = pageData.sidebars.find((sidebar) => sidebar.type === 'Left');
  const rightSideBar = pageData.sidebars.find((sidebar) => sidebar.type === 'Right');
  const leftSideBarOffset = Number(Boolean(leftSideBar));
  const rightSideBarOffset = Number(Boolean(rightSideBar));
  const { page, perPage, filters, category } = searchParams;

  const initialProductList = await clientData.getData<ProductList>(`${urls.client.searchProductsByBrand}/${params.slug}`, { page, perPage, filters: filters?.split(','), category });
  const brand = await clientData.getData<Brand>(`${urls.client.brand}/${params.slug}`);
  return <CatalogProvider>
    <PageProvider page={pageData}>
      <ProductListProvider productList={initialProductList}>
        <Container sx={{ mt: 3 }}>
          {brand && <BrandHeader brand={brand} />}
          <Grid container spacing={3}>
            {leftSideBar && (
              <Grid
                lg={GRID_COLUMN_XL}
                xl={GRID_COLUMN_XL}
                md={GRID_COLUMN_XL}
                xs={12}
                item
              >
                <SideBar {...leftSideBar} />
              </Grid>
            )}
            <Grid
              xl={12 - (leftSideBarOffset * GRID_COLUMN_XL + rightSideBarOffset * GRID_COLUMN_XL)}
              lg={12 - (leftSideBarOffset * GRID_COLUMN_XL + rightSideBarOffset * GRID_COLUMN_XL)}
              md={12 - (leftSideBarOffset * GRID_COLUMN_XL + rightSideBarOffset * GRID_COLUMN_XL)}
              xs={12}
              item
            >
              <PageContent />
            </Grid>
            {rightSideBar && (
              <Grid
                lg={GRID_COLUMN_XL}
                xl={GRID_COLUMN_XL}
                md={GRID_COLUMN_XL}
                xs={12}
                item
              >
                <SideBar {...rightSideBar} />
              </Grid>
            )}
          </Grid>
        </Container>
      </ProductListProvider>
    </PageProvider>
  </CatalogProvider>
}
