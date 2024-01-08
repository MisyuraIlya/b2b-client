"use client"
import { green } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    backgroundColor: green.A100,
    maxWidth: 352,
    p: 3,
    '& svg': {
      color: green.A700
    },
    color: green.A700,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 2,
    lineHeight: 1.71429,
    borderRadius: (theme) => theme.shape.borderRadius / 2
  },
  close: {
    cursor: 'pointer'
  },
  check: {
    width: 20,
    height: 20,
  }
}