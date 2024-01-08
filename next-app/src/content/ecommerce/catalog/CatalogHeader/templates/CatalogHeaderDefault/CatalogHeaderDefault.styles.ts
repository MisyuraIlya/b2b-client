import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5
  },
  sort: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    color: (theme) => theme.palette.grey[500],
  },
  select: {
    width: 160
  },
  toggleBtn: {
    border: 0,
    borderRadius: (theme) => `${theme.shape.borderRadius / 4} !important`,
    backgroundColor: 'transparent !important',
    color: (theme) => theme.palette.grey[400],
  },
  productView: {
    ml: 4
  },
  filters: {
    ml: 4
  },
  rightSide: {
    display: 'flex',
    alignItems: 'center',
    ml: 'auto'
  },
  count: {
    color: grey[500]
  }
}