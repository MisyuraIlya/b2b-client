"use client"

import { useTranslations } from "next-intl";
import { FC, useMemo } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useHeaderStore } from "@/context/HeaderContext";
import { CURRENCY } from "@/utils/currency";
import CreditLimit from "../CreditLimit";
import { FullCart } from "../../types";
import { styles } from './CartSummary.styles';

const DISCOUNT = 0.05;
const DELIVERY = 100;

const CartSummary: FC<{ cart: FullCart }> = ({ cart }) => {
  const { data } = useHeaderStore();
  const t = useTranslations();
  const VAT = data?.defines.VAT ?? 0;
  const subtotal = useMemo(() => cart.productCarts.reduce((acc, cur) => {
    const packageQuantity = cur.product.productPackages.find((item) => item.id === cur.productPackage.id)?.quantity ?? 0;
    return acc + cur.intermediatePrice * cur.quantity * packageQuantity;
  }, 0), [cart]);
  const discount = Number(subtotal * DISCOUNT);
  const tax = (subtotal - discount) * (VAT / 100);
  const total = (subtotal + tax + DELIVERY) - discount;
  const handleCreateOrder = () => {

  }
  return (
    <>
      <Paper sx={styles.container}>
        <Box sx={[styles.row, styles.header]}>
          <Typography variant="h5">
            {t('CART_LABEL_SUMMARY')}
          </Typography>
          <Typography variant="body2">
            {`${t('CART_LABEL_PRODUCT_QTY')}: ${cart.productCarts.length}`}
          </Typography>
        </Box>
        <Box sx={styles.row}>
          <Typography sx={styles.label} variant="subtitle1">
            {t('CART_LABEL_SUBTOTAL')}:
          </Typography>
          <Typography sx={styles.count} variant="body2">
            {`${CURRENCY}${subtotal.toFixed(2)}`}
          </Typography>
        </Box>
        <Box sx={styles.row}>
          <Typography sx={styles.label} variant="subtitle1">
            {t('CART_LABEL_DISCOUNT')}:
          </Typography>
          <Typography sx={[styles.count, styles.discount]} variant="body2">
            {`-${CURRENCY}${discount.toFixed(2)}`}
          </Typography>
        </Box>
        <Box sx={styles.row}>
          <Typography sx={styles.label} variant="subtitle1">
            {t('CART_LABEL_TAX')}:
          </Typography>
          <Typography sx={styles.count} variant="body2">
            {`${CURRENCY}${tax.toFixed(2)}`}
          </Typography>
        </Box>
        <Box sx={styles.row}>
          <Typography sx={styles.label} variant="subtitle1">
            {t('CART_LABEL_DELIVERY')}:
          </Typography>
          <Typography sx={styles.count} variant="body2">
            {`${CURRENCY}${DELIVERY}`}
          </Typography>
        </Box>
        <Box sx={[styles.row, styles.total]}>
          <Typography variant="h5">
            {t('SHOP_PRODUCT_LABEL_TOTAL_PRICE')}:
          </Typography>
          <Typography variant="h5">
            {`${CURRENCY}${total.toFixed(2)}`}
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          onClick={handleCreateOrder}
          sx={styles.createOrderBtn}
        >
          {t('CART_BUTTON_CREATE_ORDER')}
        </Button>
      </Paper>
      <CreditLimit limit={3000} total={total} />
    </>

  )
}

export default CartSummary;