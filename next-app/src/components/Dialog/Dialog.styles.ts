"use client"
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    p: 0,
    '& .MuiPaper-root': {
      maxWidth: '100%'
    }
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > button': {
      mr: -1
    }
  }
}