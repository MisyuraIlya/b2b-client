import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  field: {
    mt: 5,
  },
  emailField: {
    mb: 1
  },
  submitBtn: {
    mt: 3,
    p: 2
  },
  additionalPageDescription: {
    mt: 1.5,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  additionalPageBox: {
    display: 'flex',
    alignItems: 'center'
  },
  additionalPageBtn: { padding: 0 },
  agreementsLink: {
    color: (theme) => theme.palette.primary.main,
    textDecoration: 'underline !important'
  }
}