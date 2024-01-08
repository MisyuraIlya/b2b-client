"use client"
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { FC } from "react";
import { Box, Card, CardContent } from "@mui/material";
import Link from "@/components/Link";
import NextImage from "@/components/NextImage";
import Labels from "@/content/ecommerce/productPage/productDetails/blocks/Labels";
import { useCartStore } from "@/context/CartContext/CartContext";
import { useProductStore } from "@/context/ProductContext/ProductContext";
import { getTranslation } from "@/utils/getTranslation";
import { numberFormat } from "@/utils/numberFormat";
import ProductActions from "../../blocks/productActions";
import ProductInfo from "../../blocks/productInfo/ProductInfo";
import ProductTitle from "../../blocks/productTitle/ProductTitle";
import { ProductCardTemplateProps } from "../../types";
import { styles } from './HorizontalProductCard.styles';

const HorizontalProductCard: FC<ProductCardTemplateProps> = ({
  listWidth,
}) => {
  const { data: session } = useSession();
  const locale = useLocale();
  const { product, selectedPackage, count, setCount, setSelectedPackage, isPriceLoading, price, productCart } = useProductStore();
  const { addProductToCart, cart, updateProductInCart, cartUpdateInProgress } = useCartStore();

  if (!product) {
    return null;
  }
  const {
    translations = [],
    title,
    sku,
    barcode,
    productCardMedia,
    productPackages,
    id,
    productLabels,
    productAttributes
  } = product;
  const name = getTranslation(locale, translations, title);
  const setMlAuto = listWidth! < 920;
  const isInCart = Boolean(productCart);
  return (
    <Card sx={styles.container}>
      <Link href={`/product/${id}`}>
        <Box sx={styles.offset} />
        <Box
          sx={[styles.image, styles.cursorPointer]}
        >
          {productLabels.length ? <Labels data={productLabels} size="small" sx={styles.labels} /> : null}
          <NextImage src={productCardMedia?.thumbnailMediumPath} />
        </Box>
      </Link>

      <CardContent sx={styles.content}>
        <Box sx={[styles.info, setMlAuto ? styles.contentRight : null, styles.cursorPointer]}>
          <Box>
            <ProductTitle name={name} />
          </Box>
          <Box>
            <ProductInfo sku={sku} barcode={barcode} price={price} isPriceLoading={isPriceLoading} priceInfo="" />
          </Box>
        </Box>
        {session && (
          <Box
            sx={styles.actions}
          >
            <ProductActions
              productId={id}
              productPrices={{
                totalPrice: numberFormat.format(Number(count) * (selectedPackage?.quantity ?? 1) * (price?.basePrice ?? 0)),
                fullPrice: price?.oldPrice ? numberFormat.format(Number(count) * (selectedPackage?.quantity ?? 1) * (price?.oldPrice ?? 0)) : ''
              }}
              price={price}
              selectedPackage={selectedPackage}
              onChangePackage={setSelectedPackage}
              packageVariants={productPackages}
              packageVariantsInfo=""
              onSubmit={() => {
                if (selectedPackage && price) {
                  if (isInCart) {
                    updateProductInCart({
                      productCartId: productCart!.id,
                      productPackage: selectedPackage?.id,
                      quantity: Number(count),
                      sku: product.sku
                    })
                  } else {
                    addProductToCart({
                      productId: id,
                      productPackageId: selectedPackage?.id,
                      sku,
                      quantity: count,
                      intermediatePrice: price.basePrice,
                      cartId: cart?.id
                    })
                  }
                }
              }}
              count={count}
              setCount={setCount}
              isPriceLoading={isPriceLoading}
              volume={product.volume}
              isInCart={isInCart}
              isCartUpdating={cartUpdateInProgress[sku]}
            />
          </Box>
        )}

      </CardContent>
    </Card>
  )
}

export default HorizontalProductCard;