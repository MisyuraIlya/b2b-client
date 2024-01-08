"use client"
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { FC, useMemo } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import Breadcrumbs from "@/components/Breadcrumbs";
import CollapsibleMenuItem from "@/components/CollapsibleMenuItem/CollapsibleMenuItem";
import Gallery from "@/components/Gallery";
import { useCartStore } from "@/context/CartContext/CartContext";
import { useProductStore } from "@/context/ProductContext/ProductContext";
import { useStore } from "@/context/StoreContext";
import { useApi } from "@/hooks/api/useApi";
import urls from "@/provider/api/urls";
import { getTranslation } from "@/utils/getTranslation";
import { numberFormat } from "@/utils/numberFormat";
import { IPageComponents } from "@/types/page";
import type { SimilarProduct } from "../../blocks/SimilarProducts/types";
import { ProductCategory } from "../../types";
import { BreadcrumbsItem } from "@/components/Breadcrumbs/types";
import { ProductPackage } from "@/components/ProductCard/types";
import { styles } from './ProductDetailsDefault.styles';

const AttributesList = dynamic(() => import("../../blocks/AttributesList"));
const Description = dynamic(() => import("../../blocks/Description"));
const Labels = dynamic(() => import("../../blocks/Labels"));
const ProductActions = dynamic(() => import("@/components/ProductCard/blocks/productActions"));
const ProductInfo = dynamic(() => import("@/components/ProductCard/blocks/productInfo"));
const Files = dynamic(() => import('../../blocks/Files'));
const Links = dynamic(() => import('../../blocks/Links'));
const Tables = dynamic(() => import('../../blocks/Tables'));
const Tabs = dynamic(() => import('../../blocks/ProductTabs'));
const SimilarProducts = dynamic(() => import('../../blocks/SimilarProducts'));


const ProductDetailsDefault: FC<IPageComponents> = () => {
  const { prevPathname } = useStore();
  const { productDetails: product, selectedPackage, setSelectedPackage, setCount, count, price, isPriceLoading, productCart } = useProductStore();
  const { addProductToCart, cart, updateProductInCart, cartUpdateInProgress } = useCartStore();
  const t = useTranslations()
  const locale = useLocale();
  const { data: session } = useSession();
  const { data: similarProducts } = useApi<SimilarProduct[]>({
    entrypoint: urls.customer.similarProducts(product?.id ?? 0),
    skip: !product
  });

  if (!product) {
    notFound();
  }

  const handleChangePackage = (productPackage: ProductPackage) => {
    setSelectedPackage(productPackage);
    setCount(`${productPackage?.package.step ?? productPackage?.step ?? ''}`);
  }
  const {
    translations,
    title,
    sku,
    barcode,
    brand,
    productImages,
    productPackages,
    id,
    productAttributes,
    productLabels,
    textTranslations,
    productCharacteristics,
    productFiles,
    productLinks,
    productTables,
    productTabs,
    category
  } = product;
  const name = getTranslation(locale, translations, title);;
  const description = getTranslation(locale, textTranslations);
  const isInCart = Boolean(productCart);
  const breadcrumbs: BreadcrumbsItem[] = useMemo(() => {
    if (prevPathname.includes('brand') && brand) {
      return [
        {
          link: '/brands',
          text: t('SHOP_PAGE_TITLE_BRANDS')
        },
        {
          link: `/brand/${brand.id}`,
          text: getTranslation(locale, brand.translations, brand.name)
        }
      ]
    }
    const getLink = (cat: ProductCategory, childIds: number[]): string => {
      if (!cat.parent) {
        return `/catalog/${[cat.id, ...childIds].join('-')}`
      }
      return getLink(cat.parent, [cat.id, ...childIds])
    }
    const getBreadcrumbsItem = (cat: ProductCategory, result: BreadcrumbsItem[]): BreadcrumbsItem[] => {
      if (!cat.parent) {
        return [...result, { link: getLink(cat, []), text: getTranslation(locale, cat.translations, cat.name) }].reverse();
      }
      return getBreadcrumbsItem(cat.parent, [...result, { link: getLink(cat, []), text: getTranslation(locale, cat.translations, cat.name) }])
    }
    if (category) {
      return getBreadcrumbsItem(category, [])
    }
    return []
  }, [category, locale, prevPathname, brand, t])
  return <Box>
    <Breadcrumbs data={[...breadcrumbs, { text: name, link: '' }]} />
    <Typography variant="h4">
      {name}
    </Typography>
    <Box sx={styles.content}>
      <Grid container spacing={3}>
        <Grid xs={12} item lg={6}>
          {productLabels.length ? <Labels data={productLabels} /> : null}
          <Gallery images={productImages} />
        </Grid>
        <Grid xs={6} item lg={3}>
          <ProductInfo sku={sku} barcode={barcode} brand={brand} sx={styles.infoContainer} isPriceLoading={false} />
          <CollapsibleMenuItem
            title={<Typography sx={styles.packagingTitle} variant="subtitle1">{t('SHOP_PRODUCT_LABEL_PACKAGING_AVAILABLE')}</Typography>}
          >
            {product.productPackages.map((availablePackage) => (
              <Box key={availablePackage.id} sx={styles.packagingRow}>
                <Typography variant="subtitle2">
                  {availablePackage?.package?.name ?? 'something went wrong'}
                </Typography>
                <Typography variant="subtitle2">
                  {availablePackage?.quantity ?? ''}
                </Typography>
              </Box>
            ))}
          </CollapsibleMenuItem>
        </Grid>
        <Grid xs={6} item lg={3}>
          {session && (
            <Card sx={styles.actions}>
              <ProductInfo isPriceLoading={isPriceLoading} price={price} sx={styles.priceContainer} />
              <ProductActions
                productId={id}
                productPrices={{
                  totalPrice: numberFormat.format(Number(count) * (selectedPackage?.quantity ?? 1) * (price?.basePrice ?? 0)),
                  fullPrice: price?.oldPrice ? numberFormat.format(Number(count) * price.oldPrice) : ''
                }}
                selectedPackage={selectedPackage?.package ? selectedPackage : null}
                onChangePackage={handleChangePackage}
                count={count}
                setCount={setCount}
                packageVariants={productPackages}
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
                isPriceLoading={isPriceLoading}
                price={price}
                volume={product.volume}
                isInCart={isInCart}
                isCartUpdating={cartUpdateInProgress[sku]}
              />
            </Card>
          )}

        </Grid>
      </Grid>
      {productAttributes.length ? (
        <Grid container>
          <Grid item xs={12} lg={9}>
            <AttributesList attributes={productAttributes} characteristics={productCharacteristics} />
          </Grid>
        </Grid>
      ) : null}
      {description ? <Description description={description} /> : null}
      {productFiles.length ? <Files data={productFiles} /> : null}
      {productLinks.length ? <Links data={productLinks} /> : null}
      {productTables.length ? <Tables data={productTables} /> : null}
      {productTabs.length ? <Tabs data={productTabs} /> : null}
      {similarProducts?.length ? <SimilarProducts data={similarProducts} /> : null}
    </Box>

  </Box>
}

export default ProductDetailsDefault