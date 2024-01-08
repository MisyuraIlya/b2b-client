"use client"
import { lighten } from "@mui/material";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  drawer: {
    boxShadow: (theme) => theme.shadows[3],
    '& .MuiDrawer-paper': {
      position: 'inherit',
      borderRight: 0,
      overflow: 'hidden'
    },
    zIndex: 2
  },
  top_categories: {
    display: 'flex',
    py: '12px',
    mx: 'auto',
    height: 'initial',
    maxWidth: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    '& > a': {
      minWidth: 'fit-content',
    }
  },
  category_btn: {
    px: '16px',
    py: '8px',
    color: 'black',
    minWidth: 'fit-content',
  },
  active_category: {
    backgroundColor: (theme) => lighten(theme.palette.primary.main, 0.8),
    color: (theme) => theme.palette.primary.main,
  },
  subcategories_wrapper: {
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
  },
  subcategories: {
    position: 'absolute',
    width: '100%',
    maxWidth: '1440px',
    maxHeight: '332px',
    display: 'flex',
    boxShadow: (theme) => theme.shadows[4],
  },
}