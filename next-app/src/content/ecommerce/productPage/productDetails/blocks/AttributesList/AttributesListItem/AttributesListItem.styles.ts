"use client"

import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 2,
    '& > p': {
      '&:first-child': {
        color: grey[700]
      },
      flex: 1
    }
  }
}