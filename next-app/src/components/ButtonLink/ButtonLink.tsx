"use client"
import { FC } from 'react'
import { Button } from "@mui/material"
import Link from '../Link';
import { ButtonLinkProps } from './types';
import { styles } from './ButtonLink.styles';

const ButtonLink: FC<ButtonLinkProps> = ({ link, text, sx = null, startIcon }) => {
  return (
    <Button
      component={Link}
      startIcon={startIcon}
      href={link}
      variant="text"
      sx={[styles.container, sx]}
    >
      {text}
    </Button>
  )
}

export default ButtonLink
