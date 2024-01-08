"use client"

import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 1,
    width: '100%',
    ml: '0 !important',
    alignItems: 'baseline',
    gap: 1,
    minHeight: 26,
    flexWrap: 'wrap'
  },
  infoLine: { display: 'flex', alignItems: 'baseline' },
  totalPrice: { fontWeight: 700, fontSize: 18 },
  fullPrice: {
    color: (theme) => theme.palette.grey[500],
    textDecoration: 'line-through',
  },
  skeleton: {
    width: '100%',
    transform: 'none',
    minHeight: 'inherit'
  }
}