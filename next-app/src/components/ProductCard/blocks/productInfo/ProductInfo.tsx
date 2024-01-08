"use client"
import { useLocale, useTranslations } from "next-intl";
import { FC } from "react";
import { InfoOutlined } from '@mui/icons-material';
import { Box, Skeleton, Typography } from "@mui/material";
import IconPopover from "@/components/IconPopover/IconPopover";
import Link from "@/components/Link";
import urls from "@/provider/api/urls";
import { CURRENCY } from "@/utils/currency";
import { getTranslation } from "@/utils/getTranslation";
import { ProductInfoProps } from "./types";
import { styles } from './ProductInfo.styles'

const ProductInfo: FC<ProductInfoProps> = ({ sku, barcode, price, priceInfo, brand, sx = null, isPriceLoading }) => {
  const t = useTranslations();
  const locale = useLocale();
  return <Box sx={[styles.container, sx]}>
    {sku && (
      <Box sx={styles.block}>
        <Typography variant="subtitle2" sx={styles.label}>
          {t('SHOP_PRODUCT_LABEL_ITEM_NUMBER')}:
        </Typography>
        <Typography variant="subtitle2" sx={styles.info}>
          {sku}
        </Typography>
      </Box>
    )}

    {barcode && (
      <Box sx={styles.block}>
        <Typography variant="subtitle2" sx={styles.label}>
          {t('SHOP_PRODUCT_LABEL_BARCODE')}
        </Typography>
        <Typography variant="subtitle2" sx={styles.info}>
          {barcode}
        </Typography>
      </Box>
    )}
    {brand && (
      <Box sx={styles.block}>
        <Typography variant="subtitle2" sx={styles.label}>
          {t('SHOP_PRODUCT_LABEL_BRAND')}
        </Typography>
        <Link href={`/${urls.pages.brand}/${brand.id}`}>
          <Typography variant="subtitle2" sx={styles.info}>
            {getTranslation(locale, brand.translations, brand?.name)}
          </Typography>
        </Link>

      </Box>
    )}

    {(price || isPriceLoading) && (
      <Box sx={styles.block}>
        <Typography variant="subtitle2" sx={styles.label}>
          {t('SHOP_PRODUCT_LABEL_PRICE_PER_ITEM')}
        </Typography>
        {isPriceLoading && <Skeleton height={22} width={64} />}
        {price && !isPriceLoading && (
          <Typography variant="subtitle2" sx={[styles.info, styles.price]}>
            {`${CURRENCY}${price.basePrice}`}
          </Typography>
        )}

        {priceInfo && (
          <IconPopover icon={<InfoOutlined fontSize="small" />}>
            <Typography>
              {priceInfo}
            </Typography>
          </IconPopover>
        )}
      </Box>
    )}
  </Box>
}

export default ProductInfo;