"use client"

import { useLocale } from "next-intl";
import { FC } from "react";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { Box, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import Link from "@/components/Link";
import NextImage from "@/components/NextImage";
import { useCartStore } from "@/context/CartContext/CartContext";
import { CURRENCY } from "@/utils/currency";
import { getTranslation } from "@/utils/getTranslation";
import { priceFormat } from "@/utils/numberFormat";
import { CartTableRowProps } from "./types";
import { styles } from './CartTableRow.styles';

const CartTableRow: FC<CartTableRowProps> = ({ data, handleUpdateProduct, deleteProduct }) => {
  const { cartUpdateInProgress } = useCartStore();
  const locale = useLocale();
  const name = getTranslation(locale, data.product.translations, data.product.title);
  const selectedPackage = data.product.productPackages.find((productPackage) => productPackage.id === data.productPackage.id)
  const disabled = cartUpdateInProgress[`${data.id}`] || cartUpdateInProgress[`${data.product.sku}`];
  const defaultImage = data.product.productImages.find((image) => image.defaultImage);
  return (
    <>
      <TableRow>
        {/* <TableCell sx={styles.checkboxCell}>
            <Checkbox size="small" />
          </TableCell> */}
        <TableCell sx={styles.cell}>
          <Typography variant="body2">
            {data.sku}
          </Typography>
        </TableCell>
        <TableCell sx={styles.cell}>
          <Box sx={styles.product}>
            <Box sx={styles.image}>
              <NextImage src={defaultImage?.thumbnailSmallPath} />
            </Box>
            <Link href={`/product/${data.product.id}`}>
              <Typography variant="body2">
                {name}
              </Typography>
            </Link>
          </Box>
        </TableCell>
        <TableCell sx={styles.cell}></TableCell>
        <TableCell sx={styles.cell}>
          {selectedPackage && (
            <Box sx={styles.qty}>
              <Typography variant="body2">
                {data.quantity}
              </Typography>
              <Typography variant="body2">
                {selectedPackage?.package?.name}
              </Typography>
            </Box>
          )}
        </TableCell>
        <TableCell align="right" sx={styles.cell}>
          <Typography variant="body2">
            {`${CURRENCY}${data.intermediatePrice * (selectedPackage?.quantity ?? 1)}`}
          </Typography>
        </TableCell>
        <TableCell align="right" sx={styles.cell}>
          <Typography variant="body2">
            {`${CURRENCY}${priceFormat.format(data.intermediatePrice * data.quantity * (selectedPackage?.quantity ?? 1))}`}
          </Typography>
        </TableCell>
        <TableCell align="right" sx={[styles.cell, styles.actionCell]}>
          <IconButton disabled={disabled} sx={styles.icon} onClick={() => { handleUpdateProduct(data) }}>
            <EditOutlined />
          </IconButton>
        </TableCell>
        <TableCell align="center" sx={[styles.cell, styles.actionCell]}>
          <IconButton disabled={disabled} sx={styles.icon} onClick={() => deleteProduct(data.id)}>
            <DeleteOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}

export default CartTableRow;