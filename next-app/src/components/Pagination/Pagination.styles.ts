"use client"

import { grey } from "@mui/material/colors"
import { MuiStyles } from "@/types/mui"

export const styles: MuiStyles = {
  paginationContainer: {
    my: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    minWidth: 'max-content',
    right: 0,
    minHeight: 40
  },
  pagination: {
    marginLeft: 2
  },
  paginationRtl: {
    '& .MuiPaginationItem-previousNext, & .MuiPaginationItem-firstLast': {
      transform: 'rotate(180deg)'
    }
  },
  label: {
    color: grey[500]
  },
  select: {
    ml: 1,
    minWidth: 120,
    width: 'fit-content'
  },
  firstLastIcon: {
    px: 1
  }
}