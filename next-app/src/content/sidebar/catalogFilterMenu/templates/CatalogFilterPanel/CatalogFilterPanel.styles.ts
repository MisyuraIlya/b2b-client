"use client"

import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 312,
    ml: 'auto',
    maxHeight: 'calc(100vh - 300px)',
  },
  filtersContainer: {
    overflow: 'auto',
  },
  skeleton: {
    transform: 'none',
    height: 400
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 2,
    mb: 2
  },
  clearAll: {
    display: 'flex',
    alignItems: 'center',
    color: 'primary.main',
    fontWeight: 400,
    '& svg': {
      mr: 0.25,
      fontSize: 20
    },
    cursor: 'pointer'
  },
  applyBtn: {
    mx: 2,
    mt: 2
  }
}