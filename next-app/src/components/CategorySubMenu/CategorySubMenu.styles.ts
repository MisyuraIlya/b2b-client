"use client"
import { lighten } from "@mui/material";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  list: {
    flex: 1,
    maxWidth: '25%',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: (theme) => `${theme.palette.grey[300]} ${theme.palette.common.white}`,
    borderRight: (theme) => `1px solid ${theme.palette.grey[200]}`,
  },
  btn: {
    whiteSpace: 'normal',
    ':hover': {
      backgroundColor: (theme) => lighten(theme.palette.primary.main, 0.8),
    },
  },
  active_btn: {
    backgroundColor: (theme) => lighten(theme.palette.primary.main, 0.8),
  },
  active_color: {
    color: (theme) => theme.palette.primary.main,
  },
  category_name: {
    color: (theme) => theme.palette.text.primary,
  },
  rtlIcon: {
    transform: 'rotate(180deg)'
  }
}