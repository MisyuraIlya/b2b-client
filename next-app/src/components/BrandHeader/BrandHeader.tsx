"use client"
import { useLocale, useTranslations } from "next-intl";
import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { getTranslation } from "@/utils/getTranslation";
import Breadcrumbs from "../Breadcrumbs";
import { BrandHeaderProps } from "./types";
import { styles } from "./BrandHeader.styles";

const BrandHeader: FC<BrandHeaderProps> = ({ brand }) => {
  const t = useTranslations();
  const locale = useLocale();
  const brandName = getTranslation(locale, brand.translations, brand.name);
  return (
    <Box>
      <Breadcrumbs
        data={[
          {
            link: '/brands',
            text: t('SHOP_PAGE_TITLE_BRANDS')
          },
          {
            link: '',
            text: getTranslation(locale, brand.translations, brand.name)
          }
        ]}
      />
      <Typography sx={styles.title} variant="h4" >
        {brandName}
      </Typography>
    </Box>
  )
}

export default BrandHeader
