"use client"
import { lighten } from "@mui/material";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  drawer: {
    zIndex: 2,
    boxShadow: (theme) => theme.shadows[3],
    '& .MuiDrawer-paper': {
      position: 'inherit',
      borderRight: 0
    },
  },
  top_categories: {
    display: 'flex',
    py: '12px',
    mx: 'auto',
    height: 'initial',
    overflowY: 'auto',
    width: '100%',
    maxWidth: '1440px'
  },
  categories_btn: {
    ml: '18px',
    width: '312px',
    textTransform: 'capitalize'
  },
  search_field: {
    ml: '24px',
    mr: '18px',
    width: '648px'
  },
  category_btn: {
    px: '16px',
    py: '8px',
    color: 'black',
    minWidth: 0
  },
  active_category: {
    backgroundColor: (theme) => lighten(theme.palette.primary.main, 0.8),
    color: (theme) => theme.palette.primary.main
  },
  subcategories_wrapper: {
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center'
  },
  subcategories: {
    position: 'absolute',
    width: '100%',
    maxWidth: '1440px',
    maxHeight: '332px',
    display: 'flex',
    boxShadow: (theme) => theme.shadows[4]
  }
}