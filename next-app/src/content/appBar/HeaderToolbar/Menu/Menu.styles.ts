import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  link: {
    margin: (theme) => theme.spacing(0, 0.5),
    color: (theme) => theme.palette.primary.main,
    cursor: 'pointer',
    textTransform: 'capitalize',
  },
  activeLink: {
    color: (theme) => theme.palette.primary.dark
  }
}