"use client"

import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  content: {
    mt: 3,
    mb: 1
  },
  notification: {
    background: grey[50],
    borderRadius: (theme) => theme.shape.borderRadius / 2,
    display: 'flex',
    alignItems: 'center',
    p: (theme) => theme.spacing(2, 6, 2, 2),
    mb: 4.25,
    mr: 2,
    '& p': {
      color: grey[600],
      ml: 2
    }
  }
}