"use client"
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  gridContainer: {
    height: '100vh',
    maxHeight: '100vh',
    justifyContent: 'center'
  },
  boxContainer: {
    mx: 'auto',
    px: 1,
    maxWidth: 'calc(360px + 1rem)',
    minHeight: '100vh',
    // maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  logoImage: {
    mb: 3,
    mt: 8
  },
  authDescription: { mt: 0 },
  copyright: {
    mt: 'auto',
    pt: 1.5
  },
  description: {
    letterSpacing: "0.1px",
  },
}