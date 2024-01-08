"use client"

import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    width: '100%',
    minHeight: 200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  actions: {
    flex: 1,
    display: 'flex',
    '& > div': {
      maxWidth: 280,
      ml: 'auto',
      zIndex: 1
    }
  },
  offset: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  image: {
    height: '200px !important',
    width: '312px !important',
    minWidth: 312,
    position: 'relative'
  },
  content: {
    flex: 'auto',
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'revert-layer',
    justifyContent: 'space-between',
    padding: 3,
    ml: 'auto',
    flexWrap: 'wrap',
  },
  info: {
    flex: 2,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    '& > div': {
      minWidth: 220,
      width: '100%',
      maxWidth: 280,
      '&:last-child': {
        mb: 3
      }
    }
  },
  contentRight: {
    '& > div': {
      ml: 'auto'
    }
  },
  cursorPointer: {
    cursor: 'pointer'
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