"use client"
import { useLocale, useTranslations } from "next-intl";
import { FC, useState } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import Container from "@/components/Container";
import Link from "@/components/Link";
import NextImage from "@/components/NextImage";
import Pagination from "@/components/Pagination";
import { useBrandsListStore } from "@/context/BrandsListContext/BrandsListContext";
import { useStore } from "@/context/StoreContext";
import { getTranslation } from "@/utils/getTranslation";
import { BrandsListDefaultProps } from "./types";
import { styles } from './BrandsListDefault.styles';

import BrandsListFilters from "./BrandsListFilters";
import BrandsListSkeleton from "./BrandsListSkeleton";

const BrandsListDefault: FC<BrandsListDefaultProps> = (props) => {
  const locale = useLocale();
  const t = useTranslations();

  const [selectedAlphabet, setSelectedAlphabet] = useState(locale);
  const { brandsList, page, perPage, handleChangePagination, isLoading } = useBrandsListStore();

  const { languages } = useStore();
  const direction = languages.find((language) => language.code === selectedAlphabet)?.direction ?? 'ltr';
  if (!brandsList) {
    return;
  }

  const start = ((brandsList.currentPage - 1) * brandsList.perPage) + 1;
  const pageEnd = brandsList.currentPage * brandsList.perPage;

  return (
    <Container sx={styles.container}>
      <Typography variant="h5">
        {t('SHOP_PAGE_TITLE_BRANDS')}
      </Typography>
      <BrandsListFilters handleChangeAlphabet={setSelectedAlphabet} />
      {!brandsList.totalItems ? (
        <Box sx={styles.empty}>
          <Typography variant="h5">
            {t('SHOP_LABEL_NO_MATCHES_FOUND')}
          </Typography>
        </Box>
      ) : null}
      {isLoading ? <BrandsListSkeleton count={perPage} /> : (
        <Grid sx={styles.brands} container spacing={3}>
          {brandsList.data.map((brand) => {
            const brandName = getTranslation(selectedAlphabet, brand.translations, brand.name);
            return (
              <Grid item lg={3} md={4} xs={6} key={brand.id}>
                <Card sx={styles.brand}>
                  <Link href={`/brand/${brand.id}`}>
                    <Box sx={styles.image}>
                      <NextImage src={brand.image} />
                    </Box>
                    <Typography sx={[styles.brandName, { direction }]} variant="subtitle1">
                      {brandName}
                    </Typography>
                  </Link>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}

      {brandsList.totalItems ? (
        <Pagination
          label={t('SHOP_CATALOG_PAGINATION_SHOWING_PRODUCTS', { start, end: Math.min(pageEnd, brandsList.totalItems), total: brandsList.totalItems })}
          page={page}
          disabled={isLoading}
          totalPages={brandsList.totalPages}
          perPageOptions={[25, 50, 100]}
          perPage={perPage}
          changePagination={handleChangePagination}
        />
      ) : null}
      
      
    </Container>
  )
}

export default BrandsListDefault;