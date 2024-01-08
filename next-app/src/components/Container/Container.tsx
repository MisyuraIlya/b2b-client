"use client"

import { FC } from "react";
import { Container as MuiContainer, ContainerProps } from "@mui/material";
import { MuiStyle } from "@/types/mui";
import { styles } from './Container.styles';

const Container: FC<ContainerProps & { sx?: MuiStyle }> = ({ children, sx = null, ...rest }) => {
  return (
    <MuiContainer sx={[styles.container, sx]} {...rest} disableGutters>
      {children}
    </MuiContainer>
  )
}

export default Container;