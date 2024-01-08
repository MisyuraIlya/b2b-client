"use client"
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Box, Skeleton, Typography } from '@mui/material'
import { CURRENCY } from '@/utils/currency'
import { ProductTotalProps } from './types'
import { styles } from './ProductTotal.styles'

const ProductTotal: FC<ProductTotalProps> = ({
  totalPrice,
  fullPrice,
  size,
  volumePrice,
  isPriceLoading
}) => {
  const t = useTranslations()

  return (
    <Box sx={styles.wrapper}>
      {isPriceLoading ? (
        <Skeleton sx={styles.skeleton} />
      ) : (
        <>
            <Box sx={styles.infoLine}>
              <Typography variant="body2" color="text.secondary">
                {t('SHOP_PRODUCT_LABEL_TOTAL_PRICE')}:
              </Typography>

              <Box sx={styles.infoLine}>
                <Typography variant="body2">&nbsp;</Typography>
                <Typography variant="body2" sx={styles.totalPrice}>
                  {CURRENCY}
                </Typography>
                <Typography variant="body2" sx={styles.totalPrice}>
                  {totalPrice}
                </Typography>

                {fullPrice && (
                  <>
                    <Typography variant="body2">&nbsp;</Typography>
                    <Typography variant="body2" sx={styles.fullPrice}>
                      {CURRENCY}
                    </Typography>
                    <Typography variant="body2" sx={styles.fullPrice}>
                      {fullPrice}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
            <Box sx={styles.infoLine}>
              <Typography variant="body2" color="text.secondary">
                {t('SHOP_PRODUCT_LABEL_VOLUME_PRICE')}
              </Typography>
              <Typography variant="body2">&nbsp;</Typography>
              <Typography variant="body2" color="text.secondary">
                {size}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {':'}
              </Typography>
              <Typography variant="body2">&nbsp;</Typography>
              <Typography variant="body2" color="text.secondary">
                {CURRENCY}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {volumePrice}
              </Typography>
            </Box>
        </>
      )}
    </Box>
  )
}

export default ProductTotal
