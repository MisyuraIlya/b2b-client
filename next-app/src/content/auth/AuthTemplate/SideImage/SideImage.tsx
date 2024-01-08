"use client"
import { FC } from 'react'
import { Grid } from '@mui/material'
import DynamicImage from '@/components/DynamicImage/DynamicImage'
import { SideImageProps } from './types'

const SideImage: FC<SideImageProps> = ({ media, isShow = false }) => {
  if (!media) return null

  return isShow ? (
    <Grid
      item
      xs={false}
      md={6}
      component={DynamicImage}
      media={media}
    />
  ) : null
}

export default SideImage
