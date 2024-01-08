"use client"
import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { DescriptionProps } from './types';
import { styles } from './Description.styles';

const Description: FC<DescriptionProps> = ({ description }) => {
  return (
    <Box sx={styles.container}>
      <Typography
        component="div"
        variant="body2"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </Box>
  )
}

export default Description;