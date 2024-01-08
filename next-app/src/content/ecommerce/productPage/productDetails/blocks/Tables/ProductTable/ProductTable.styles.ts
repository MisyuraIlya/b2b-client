import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    mt: 5
  },
  table: {
    '& tr > th': {
      pl: 2
    },
    '& tbody td': {
      fontWeight: 500,
      color: grey[700],
      lineHeight: 1.42857,
      letterSpacing: '0.1px',
      pl: 2,
      py: 1.25
    }
  }
}