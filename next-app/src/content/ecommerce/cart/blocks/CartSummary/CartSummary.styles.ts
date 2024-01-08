import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    p: 2,
    borderRadius: (theme) => theme.shape.borderRadius / 2
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 2
  },
  header: {
    mb: 3,
  },
  label: {
    color: grey[500],
    lineHeight: 1.71429
  },
  count: {
    color: (theme) => theme.palette.text.primary,
    fontWeight: 600
  },
  discount: {
    color: (theme) => theme.palette.error.main
  },
  total: {
    mt: 3
  },
  createOrderBtn: {
    height: 40,
    mt: 5,
  }
}