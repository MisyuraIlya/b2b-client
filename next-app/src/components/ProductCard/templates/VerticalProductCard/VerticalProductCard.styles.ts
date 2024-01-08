"use client"

import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    maxWidth: 312,
    minWidth: 270,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  actions: {
    mt: 'auto'
  },
  cursorPointer: {
    cursor: 'pointer'
  },
  image: {
    height: '242px !important',
    position: 'relative'
  },
  gridItem: {
    height: '100%',
    width: 'fit-content',
    mx: 'auto'
  },
  labels: {
    position: 'absolute',
    left: 8,
    top: 8,
    zIndex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0.5
  }
}