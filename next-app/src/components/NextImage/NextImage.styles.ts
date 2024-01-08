"use client"
import { alpha } from "@mui/material";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  noImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    maxHeight: 'inherit',
    minHeight: 'inherit',
    background: (theme) => alpha(theme.palette.primary.main, 0.4)
  },
  noImageIcon: {
    height: '50%',
    width: '50%',
    color: (theme) => theme.palette.primary.main
  },
  container: {
    maxHeight: 'inherit',
    minHeight: 'inherit',
    width: '100%',
    height: '100%',
    position: 'relative',
    '& img': {
      width: '100%',
      height: '100%'
    }
  }
}