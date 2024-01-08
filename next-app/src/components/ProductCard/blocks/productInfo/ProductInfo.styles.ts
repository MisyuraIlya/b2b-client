"use client"

import { grey } from "@mui/material/colors"
import { MuiStyles } from "@/types/mui"

export const styles: MuiStyles = {
  price: {
    fontWeight: 700
  },
  block: {
    display: 'flex',
    alignItems: 'center'
  },
  label: {
    color: grey[500],
    mr: 0.5,
    lineHeight: '20px'
  },
  container: {
    mt: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  },
  info: {
    color: (theme) => theme.palette.text.primary,
    lineHeight: '20px'
  }
}