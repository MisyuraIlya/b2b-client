"use client"

import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 312,
    ml: 'auto',
    position: 'sticky'
  },
  filtersContainer: {
    overflow: 'auto',
  },
  skeleton: {
    transform: 'none',
    height: 400
  }
}