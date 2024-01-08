import { SystemStyleObject } from "@mui/system";
import { Theme } from "@mui/material/styles";

export type MuiStyle = SystemStyleObject<Theme>;

export type MuiStyles = Record<string, MuiStyle>

export interface CustomPalette {
  name: string;
  primaryLight: string;
  primaryMain: string;
  primaryDark: string;
  primaryContrastText: string;
  secondaryLight: string;
  secondaryMain: string;
  secondaryDark: string;
  secondaryContrastText: string;
  tertiaryLight: string;
  tertiaryMain: string;
  tertiaryDark: string;
  tertiaryContrastText: string;
  errorLight: string;
  errorMain: string;
  errorDark: string;
  errorContrastText: string;
  warningLight: string;
  warningMain: string;
  warningDark: string;
  warningContrastText: string;
  infoLight: string;
  infoMain: string;
  infoDark: string;
  infoContrastText: string;
  successLight: string;
  successMain: string;
  successDark: string;
  successContrastText: string;
}
