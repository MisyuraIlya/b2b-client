"use client"

import { useLocale, useTranslations } from 'next-intl'
import { FC } from 'react'
import { InfoOutlined } from '@mui/icons-material'
import { Box, Button, SelectChangeEvent, Typography } from '@mui/material'
import IconPopover from '@/components/IconPopover'
import ProductCount from '@/components/ProductCount'
import ProductTotal from '@/components/ProductTotal'
import Select from '@/components/Select'
import { priceFormat } from '@/utils/numberFormat'
import { ProductPackage } from '../../types'
import { ProductActionsProps } from './types'
import { styles } from './ProductActions.styles'

const ProductActions: FC<ProductActionsProps> = ({
  productPrices,
  packageVariants,
  packageVariantsInfo,
  onSubmit,
  onChangePackage,
  selectedPackage,
  price,
  count,
  setCount,
  isPriceLoading,
  volume = 0,
  isInCart,
  isCartUpdating
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const getSize = (currentPackage: ProductPackage) => {
    const unitTranslation = currentPackage.unit.translations[locale] ?? currentPackage.unit.name;
    if (currentPackage.package.weighAble) {
      return `1${unitTranslation}`
    }
    return `100${unitTranslation}`
  }

  const getVolumePrice = (currentPackage: ProductPackage) => {
    if (volume && price?.basePrice && !currentPackage.package.weighAble) {
      return priceFormat.format((price.basePrice / volume) * 100)
    }
    return price?.basePrice ?? 0
  }
  return (
    <Box sx={styles.container}>
      {selectedPackage ? (
        <>
          <Box sx={styles.itemsPropsChangeWrapper}>
            <ProductCount disabled={isCartUpdating} count={count} setCount={setCount} step={selectedPackage.package.step ?? selectedPackage.step} max={price?.stock ?? 1} />
            <Box sx={styles.itemsPropsChange}>
              {packageVariants.length > 1 ? (
                <Select
                  disabled={isCartUpdating}
                  value={selectedPackage?.id}
                  options={packageVariants.map((option) => ({ text: option.package.name, value: option.id }))}
                  onChange={(e: SelectChangeEvent<number>) => {
                    const id = e.target.value;
                    const productPackage = packageVariants.find((item) => item.id === id);
                    if (productPackage) {
                      onChangePackage(productPackage)
                    }
                  }}
                />
              ) : (
                <Typography sx={styles.singlePackage}>
                  {selectedPackage?.package?.name}
                </Typography>
              )}

              {packageVariantsInfo && (
                <IconPopover icon={<InfoOutlined fontSize="small" />}>
                  <Typography>
                    {packageVariantsInfo}
                  </Typography>
                </IconPopover>
              )}
            </Box>
          </Box>
          {price !== null ? (
            <ProductTotal
              totalPrice={productPrices.totalPrice}
              fullPrice={productPrices.fullPrice}
              size={getSize(selectedPackage)}
              volumePrice={getVolumePrice(selectedPackage)}
              isPriceLoading={isPriceLoading}
            />
          ) : null}

        </>
      ) : null}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={onSubmit}
        sx={styles.addToCartBtn}
        disabled={!selectedPackage || !price || isCartUpdating}
      >
        {t(isInCart ? 'SHOP_PRODUCT_BUTTON_UPDATE_CART' : 'SHOP_PRODUCT_BUTTON_ADD_TO_CART')}
      </Button>
    </Box>
  )
}

export default ProductActions
