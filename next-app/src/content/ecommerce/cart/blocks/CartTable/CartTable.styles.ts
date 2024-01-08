"use client"

import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  checkboxCell: {
    padding: 0,
    borderBottom: 0,
    width: 40
  },
  productHead: {
    width: 282
  },
  table: {
    borderTopLeftRadius: (theme) => theme.shape.borderRadius * 2,
    borderTopRightRadius: (theme) => theme.shape.borderRadius * 2,
    mt: 3.75
  },
  head: {
    backgroundColor: grey[100],
  },
  hide: {
    display: 'none'
  },
  emptyCart: {
    mt: 3
  }
}