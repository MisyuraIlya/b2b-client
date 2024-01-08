"use client"
import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    mt: 5,
    borderRadius: (theme) => theme.shape.borderRadius * 0.375,
    overflow: 'hidden'
  },
  content: {
    p: 3
  },
  tabs: {
    '& .MuiTabs-scroller': {
      overflow: 'auto',
    }
  }
}