"use client"
import ImageNext from "next/image";
import { FC, useState } from "react";
import { PhotoOutlined } from '@mui/icons-material';
import { Box, Skeleton } from "@mui/material";
import { NextImageProps } from "./types";
import { styles } from './NextImage.styles';

const ImageSkeleton = () => <Skeleton variant="rectangular" width="100%" height="100%" />

const NextImage: FC<NextImageProps> = ({ src }) => {

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!src) {
    return <Box sx={styles.noImageContainer}>
      <PhotoOutlined sx={styles.noImageIcon} />
    </Box>
  }

  const displaySkeleton = !isImageLoaded

  return (
    <Box sx={styles.container}>
      {displaySkeleton && (
        <Box height="100%" width="100%" sx={{ opacity: isImageLoaded ? 0 : 1, position: 'absolute', maxHeight: 'inherit', minHeight: 'inherit' }} >
          <ImageSkeleton />
        </Box>
      )}
      <Box height="100%" width="100%" sx={{ opacity: isImageLoaded ? 1 : 0, maxHeight: 'inherit', minHeight: 'inherit' }}>
        <ImageNext
          src={src!}
          width={0}
          height={0}
          alt={''}
          onLoadStart={() => setIsImageLoaded(false)}
          onLoad={() => setIsImageLoaded(true)}
          unoptimized
        />
      </Box>
    </Box>
  )
}
export default NextImage;