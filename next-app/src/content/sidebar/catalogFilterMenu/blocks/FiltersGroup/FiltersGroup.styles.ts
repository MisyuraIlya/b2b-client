"use client"
import { lighten } from "@mui/material";
import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  filtersGroup: {
    pb: 2,
    mb: 0,
    '&:last-of-type': {
      pb: 1,
    }
  },
  filters: {
    pl: 2.5,
    pr: 1,
    mr: 1
  },
  formGroupTitle: {
    '&.Mui-expanded': {
      mb: 1
    },
    pl: 1.5,
    pr: 2
  },
  filterGroupName: {
    fontSize: 14,
    fontWeight: 700,
    px: 0.5,
    color: (theme) => theme.palette.text.primary,
    borderRadius: (theme) => theme.shape.borderRadius / 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    lineHeight: '24px',
    textTransform: 'capitalize'
  },
  clear: {
    display: 'flex',
    alignItems: 'center',
    color: grey[400],
    fontWeight: 400,
    '& svg': {
      mr: 0.25,
      fontSize: 20
    }
  },
  showAllLess: {
    ml: -0.5,
    color: 'primary.main',
    cursor: 'pointer',
    maxWidth: 'fit-content',
    mt: 1
  },
  label: {
    mr: 1
  },
  nonFormControlContent: {
    ml: 2.5
  },
  ml05: {
    ml: 0.5
  },
  categoryLabel: {
    mb: 0.75,
    '&:last-of-type': {
      mb: 0
    },
    cursor: 'pointer',
    width: 'fit-content',
    px: 0.5,
    py: 0.25,
    borderRadius: (theme) => theme.shape.borderRadius * 0.375,
    '&:hover': {
      backgroundColor: (theme) => lighten(theme.palette.primary.main, 0.95),
      color: 'primary.main',
    }
  },
  activeCategory: {
    color: 'primary.main',
    backgroundColor: (theme) => lighten(theme.palette.primary.main, 0.8),
  },
}