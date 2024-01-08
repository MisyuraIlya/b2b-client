import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  actions: {
    padding: 3,
    maxWidth: 312,
    ml: 'auto'
  },
  priceContainer: {
    mt: 0,
    mb: 2
  },
  infoContainer: {
    mb: 1
  },
  packagingRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${grey[300]}`,
    height: 32,
    ml: 1.5
  },
  packagingTitle: {
    px: 0.5,
  },
  content: {
    mt: 2,
    mb: 5
  }
}