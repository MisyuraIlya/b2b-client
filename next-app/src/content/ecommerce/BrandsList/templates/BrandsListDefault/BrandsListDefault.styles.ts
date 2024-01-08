import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  container: {
    mt: 3
  },
  searchRow: {
    mt: 0
  },
  brand: {
    height: '100%'
  },
  navigation: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  navigationItem: {
    color: grey[400],
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  navigationItemSelected: {
    color: 'common.black'
  },
  search: {
    width: '100%'
  },
  image: {
    height: 161
  },
  brands: {
    mt: 3
  },
  brandName: {
    color: 'text.primary',
    p: 1,
    fontWeight: 500,
    lineHeight: '24px',
    minHeight: 40
  },
  empty: {
    textAlign: 'center',
    mt: 4
  }
}