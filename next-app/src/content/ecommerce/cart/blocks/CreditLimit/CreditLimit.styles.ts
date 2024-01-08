"use client"

import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    borderRadius: (theme) => theme.shape.borderRadius / 2,
    p: 2,
    backgroundColor: grey[50],
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: grey[100],
    mt: 3
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  limitProgress: {
    mt: 2,
    mb: 1,
    p: 0,
    height: 8,
    '& span': {
      height: 8,
      borderRadius: (theme) => theme.shape.borderRadius / 2 * 0.75,
    },
    '& > span': {
      width: '100%'
    }
  },
  limit: {
    fontWeight: 700,
    lineHeight: 1.71429
  },
  label: {
    color: grey[600]
  },
  message: {
    lineHeight: 1.33333
  }
}