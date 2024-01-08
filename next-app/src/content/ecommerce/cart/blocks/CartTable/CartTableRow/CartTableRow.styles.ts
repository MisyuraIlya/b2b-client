"use client"

import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  image: {
    width: 40,
    height: 40,
    minWidth: 40,
    minHeight: 40,
    mr: 1
  },
  product: {
    maxWidth: 282,
    display: 'flex',
    alignItems: 'flex-start',
  },
  cell: {
    px: 1,
    py: 2.25,
    verticalAlign: 'top',
    color: (theme) => theme.palette.text.primary,
    '& p': {
      color: (theme) => theme.palette.text.primary
    }
  },
  checkboxCell: {
    padding: 0,
    verticalAlign: 'top',
    pt: 1.2
  },
  qty: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5
  },
  quantity: {
    minWidth: 48,
    maxWidth: 48,
    height: 32,
    '& input': {
      px: 1.5,
      py: 0.75,
      fontWeight: 400,
      fontSize: 14,
      height: 20
    }
  },
  icon: {
    mt: -1,
    color: (theme) => theme.palette.text.primary,
    mr: -1
  },
  actionCell: {
    width: 32
  },
  edit: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transition: 'all 0.5s ease-out'
  }
}