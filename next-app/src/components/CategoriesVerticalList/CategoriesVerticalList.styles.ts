
"use client"
import { lighten } from "@mui/material";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  listItem: {
    p: 0,
    width: 'fit-content',
    maxWidth: '100%',
    '& > div': {
      width: '100%'
    }
  },
  nonCollapsibleCategory: {
    marginLeft: 3,
    marginBottom: (theme) => theme.spacing(2)
  },
  rootCategory: {
    fontWeight: 700
  },
  category: {
    px: 1,
    fontWeight: 400,
    color: (theme) => theme.palette.text.primary,
    borderRadius: (theme) => theme.shape.borderRadius / 3,
    '&:hover': {
      color: 'primary.main',
      backgroundColor: (theme) => lighten(theme.palette.primary.main, 0.95),
    }
  },
  activeCategory: {
    color: 'primary.main',
    backgroundColor: (theme) => lighten(theme.palette.primary.main, 0.8),
  },
  accordionSubCategory: {
    marginBottom: (theme) => theme.spacing(1.25)
  },
  accordionDetailsSubCategory: {
    marginTop: (theme) => theme.spacing(1.25)
  },
  list: {
    py: 0
  }
}