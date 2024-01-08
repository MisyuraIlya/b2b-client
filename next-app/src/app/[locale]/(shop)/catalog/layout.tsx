import { ReactNode, Suspense } from "react";
import { Grid } from "@mui/material";
import Container from "@/components/Container/Container";
import SideBar from "@/content/sidebar";
import { CatalogProvider } from "@/context/CatalogContext/CatalogContext";
import { PageProvider } from "@/context/PageContext/PageContext";
import { clientManager } from "@/provider/api";
import urls from "@/provider/api/urls";

const GRID_COLUMN_XL = 3;
const GRID_COLUMN_LG = 4;

export default async function CatalogLayout({ children }: {
  children: ReactNode
}) {
  const page = await clientManager.getPage(urls.pages.catalog);
  const leftSideBar = page.sidebars.find((sidebar) => sidebar.type === 'Left');
  const rightSideBar = page.sidebars.find((sidebar) => sidebar.type === 'Right');
  const leftSideBarOffset = Number(Boolean(leftSideBar));
  const rightSideBarOffset = Number(Boolean(rightSideBar));
  return (
    <Suspense fallback={<div>Loading</div>}>
      <CatalogProvider>
        <PageProvider page={page}>
          <section>
            <Container sx={{ mt: 3 }}>
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
                  {children}
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
          </section>
        </PageProvider>

      </CatalogProvider>
    </Suspense>
  )
}