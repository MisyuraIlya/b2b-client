import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  filters: {
    mt: 0.5,
    "& > .MuiPaper-root": {
      pt: 1,
      pb: 2,
      width: 312
    }
  },
  openBtn: {
    borderColor: grey[300],
    color: grey[700],
    height: 32
  }
}