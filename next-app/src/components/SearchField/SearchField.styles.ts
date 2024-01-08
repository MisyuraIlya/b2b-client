import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: 300,
    border: (theme) => `1px solid ${theme.palette.grey[200]}`,
    borderRadius: '6px',
  },
  iconBtn: { p: 1 },
  input: { ml: 0.5, flex: 1 },
}