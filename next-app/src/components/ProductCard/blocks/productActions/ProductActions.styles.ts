"use client"

import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  itemsPropsChangeWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemsPropsChange: { display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' },
  addToCartBtn: {
    height: '40px',
    mt: 1.5,
  },
  noBackground: {
    '.MuiCardActionArea-focusHighlight': {
      backgroundColor: 'transparent',
    },
  },
  infoIcon: {
    ml: 0.5
  },
  container: {
    width: '100%'
  },
  singlePackage: {
    ml: 1.75,
    mr: 'auto'
  }
} 