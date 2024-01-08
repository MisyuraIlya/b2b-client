"use client"
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    mt: 5,
    gap: 1
  },
  item: {
    color: 'primary.main',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    maxWidth: 'fit-content',
    '& p': {
      fontWeight: 700,
      lineHeight: 1.71429,
      ml: 1
    }
  }
}