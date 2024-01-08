import { grey } from "@mui/material/colors";
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  searchContainer: {
    width: '423px',
    px: 1,
    pb: 1,
    background: 'transparent'
  },
  inputIcon: {
    color: (theme) => theme.palette.common.black
  },
  closeIcon: {
    cursor: 'pointer'
  },
  input: {
    width: '100%',
    backgroundColor: 'common.white',
    color: (theme) => theme.palette.common.black,
    overflow: 'hidden',
    '& input': {
      maxHeight: 40,
      height: 20,
      py: 1.25,
      lineHeight: '20px',
      '&:focus': {
        outline: 'none'
      }
    },
    '& .MuiInputBase-root': {
      backgroundColor: 'common.white',
      borderRadius: (theme) => theme.shape.borderRadius * 0.375
    },
  },
  startAdornment: {
    minWidth: '24px'
  },
  searchResult: {
    width: '100%',
    mt: 0.5,
    p: (theme) => theme.spacing(1.5, 1.5, 2, 1.5),
    backgroundColor: 'common.white',
    borderRadius: (theme) => theme.shape.borderRadius * 0.375,
    boxShadow: (theme) => theme.shadows[2]
  },
  searchResultItemName: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: (theme) => theme.palette.text.primary
  },
  searchResultItemBrand: {
    color: grey[500],
  },
  viewAllResults: {
    '& .MuiTypography-root': {
      color: (theme) => theme.palette.primary.main,
      '&:hover': {
        color: (theme) => theme.palette.primary.light,
      }
    },
    mt: 2,
    mx: 'auto',
    width: 'fit-content'
  },
  image: {
    height: 20,
    width: 20
  },
  searchRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    '&:hover': {
      '& p': {
        color: (theme) => theme.palette.primary.main,
      }
    }
  },
  searchResultContent: {
    flex: 1,
    maxWidth: (theme) => `calc(100% - 20px - ${theme.spacing(1.5)})`,
    '& > div': {
      py: 1.5,

    }
  },
  progress: {
    textAlign: 'center'
  },
  empty: {
    textAlign: 'center'
  }
}