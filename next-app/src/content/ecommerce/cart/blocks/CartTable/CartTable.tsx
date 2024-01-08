"use client"
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { CartTableProps } from "./types";
import { styles } from './CartTable.styles';

import CartTableRow from "./CartTableRow";


const CartTable: FC<CartTableProps> = ({ data, handleUpdateProduct, deleteProduct }) => {
  const t = useTranslations();
  if (!data.length) {
    return <Typography sx={styles.emptyCart} variant="subtitle1">
      {t('CART_MESSAGE_EMPTY_CART')}
    </Typography>
  }
  return <TableContainer component={Paper} sx={styles.table}>
    <Table>
      <TableHead sx={styles.head} >
        <TableRow>
          {/* <TableCell sx={styles.checkboxCell}>
            <Checkbox size="small" />
          </TableCell> */}
          <TableCell>{t('SHOP_PRODUCT_LABEL_ITEM_NUMBER')}</TableCell>
          <TableCell sx={styles.productHead}>{t('CART_LABEL_PRODUCT')}</TableCell>
          <TableCell>{t('CART_LABEL_AVAILABILITY')}</TableCell>
          <TableCell>{t('CART_LABEL_QTY')}</TableCell>
          <TableCell align="right">{t('CART_LABEL_ITEM_PRICE')}</TableCell>
          <TableCell align="right">{t('CART_LABEL_SUBTOTAL')}</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((product) => (
          <CartTableRow key={product.id} data={product} handleUpdateProduct={handleUpdateProduct} deleteProduct={deleteProduct} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}

export default CartTable;