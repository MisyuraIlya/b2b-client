import { useLocale, useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";
import { Box, Button, CircularProgress, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Dialog from "@/components/Dialog";
import Link from "@/components/Link";
import NextImage from "@/components/NextImage";
import ProductCount from "@/components/ProductCount";
import Select from "@/components/Select";
import { useCartStore } from "@/context/CartContext/CartContext";
import { getTranslation } from "@/utils/getTranslation";
import { EditProductCartDialogProps } from "./types";
import { ProductPackage } from "@/components/ProductCard/types";
import { styles } from './EditProductCartDialog.styles';

const EditProductCartDialog: FC<EditProductCartDialogProps> = ({ productCart, handleClose, open, handleSave }) => {
  const t = useTranslations();
  const locale = useLocale();
  const [note, setNote] = useState('');
  const [productPackage, setProductPackage] = useState<ProductPackage | null>(null)
  const [quantity, setQuantity] = useState('');
  const { cartUpdateInProgress } = useCartStore();
  useEffect(() => {
    if (productCart && open) {
      setNote(productCart.note ?? '');
      setProductPackage(productCart.product.productPackages.find((item) => item.id === productCart.productPackage.id) ?? null);
      setQuantity(`${productCart.quantity}`);
    }
  }, [productCart, open]);
  if (!productCart) {
    return;
  }
  const name = getTranslation(locale, productCart.product.translations, productCart.product.title);
  const defaultImage = productCart.product.productImages.find((image) => image.defaultImage);

  return (
    <Dialog
      handleClose={handleClose}
      open={open}
      title={t('CART_LABEL_EDIT_PRODUCT')}
      containerSx={styles.dialog}
    >
      <Box>
        <Box sx={styles.product}>
          <Box sx={styles.image}>
            <NextImage src={defaultImage?.thumbnailSmallPath} />
          </Box>
          <Link href={`/product/${productCart.product.id}`}>
            <Typography variant="body2">
              {name}
            </Typography>
          </Link>
        </Box>
        <Box sx={styles.row}>
          <Typography variant="body1">
            {t('CART_LABEL_QTY')}
          </Typography>
          <ProductCount disabled={cartUpdateInProgress[productCart.sku]} count={quantity} setCount={setQuantity} step={productPackage?.package.step ?? productPackage?.step ?? 0} max={9999} />
        </Box>
        <Box sx={styles.row}>
          <Typography variant="body1">
            {t('CART_LABEL_PACKAGE')}
          </Typography>
          {productCart?.product.productPackages.length > 1 ? (
            <Select
              containerSx={styles.select}
              disabled={cartUpdateInProgress[productCart.sku]}
              value={productPackage?.id ?? 0}
              options={productCart.product.productPackages.map((option) => ({ text: option.package.name, value: option.id }))}
              onChange={(e: SelectChangeEvent<number>) => {
                const id = e.target.value;
                const productPackage = productCart?.product.productPackages.find((item) => item.id === id);
                if (productPackage) {
                  setProductPackage(productPackage)
                }
              }}
            />
          ) : (
            <Typography variant="body1">
              {productPackage?.package?.name}
            </Typography>
          )}
        </Box>
        <TextField
          sx={styles.note}
          fullWidth
          multiline
          placeholder={t('CART_LABEL_ADD_NOTE')}
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={styles.saveButton}
          disabled={cartUpdateInProgress[productCart.sku]}
          onClick={() => handleSave({
            productCartId: productCart.id,
            productPackage: productPackage?.id,
            quantity: Number(quantity),
            sku: productCart.product.sku,
            note
          })}
          startIcon={cartUpdateInProgress[productCart.sku] && <CircularProgress color="inherit" size={16} />}
        >
          {t('CART_BUTTON_SAVE')}
        </Button>
      </Box>
    </Dialog>
  )
}

export default EditProductCartDialog;