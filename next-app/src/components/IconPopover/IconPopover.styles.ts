"use client"
import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  iconWrapper: {
    ml: 0.5,
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
      color: grey[500]
    }
  },
  popover: { pointerEvents: 'none' },
}
