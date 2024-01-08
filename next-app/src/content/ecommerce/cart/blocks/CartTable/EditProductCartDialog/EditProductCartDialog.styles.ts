import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  dialog: {
    '& .MuiPaper-root': {
      width: 408
    }

  },
  image: {
    height: 40,
    width: 40,
    mr: 1
  },
  product: {
    display: 'flex',
    alignItems: 'flex-start',
    '& p': {
      color: (theme) => theme.palette.text.primary
    }
  },
  saveButton: {
    height: 56,
    mt: 5
  },
  note: {
    mt: 3
  },
  row: {
    mt: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  select: {
    width: 200
  }
}