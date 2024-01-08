"use client"
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    display: 'flex',
    mt: 5,
    gap: 5
  },
  item: {
    color: 'primary.main',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
    '& p': {
      fontWeight: 500
    }
  },
  image: {
    height: 56,
    width: 56,
    borderRadius: (theme) => theme.shape.borderRadius * 0.375,
    overflow: 'hidden'
  }
}