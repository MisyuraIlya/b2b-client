"use client"

import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    maxWidth: 312,
    m: (theme) => theme.spacing(0, 2, 2, 2)
  },
  searchField: {
    width: '100%',
    mb: 3
  }
}