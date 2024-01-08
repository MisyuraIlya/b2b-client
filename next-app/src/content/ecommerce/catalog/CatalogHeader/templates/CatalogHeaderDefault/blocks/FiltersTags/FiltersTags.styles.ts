import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    display: 'flex',
    gap: 1.75,
    alignItems: 'center',
    mt: 2,
    flexWrap: 'wrap'
  },
  filter: {
    borderRadius: (theme) => theme.shape.borderRadius * 0.375,
    background: grey[50],
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: grey[200],
    '& .MuiChip-label': {
      pr: 1
    }
  },
  clearAll: {
    display: 'flex',
    alignItems: 'center',
    color: 'primary.main',
    fontWeight: 400,
    '& svg': {
      mr: 0.25,
      fontSize: 20
    },
    cursor: 'pointer'
  },
  filterName: {
    textTransform: 'capitalize',
    display: 'inline',
    color: grey[400]
  },
  filterValue: {
    display: 'inline',
    color: grey[700]
  },
  deleteIcon: {
    color: grey[400]
  }
}