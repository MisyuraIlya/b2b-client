"use client";
import { forwardRef } from 'react';
import { CustomContentProps, useSnackbar } from 'notistack';
import { Check, Close } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { styles } from './Success.styles';

const Success = forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <Box sx={styles.container} ref={ref}>
      <Check sx={styles.check} />
      <Typography variant="body2">
        {props.message}
      </Typography>
      <Close onClick={() => { closeSnackbar(props.id) }} sx={styles.close} />
    </Box>
  )
});

Success.displayName = 'Success';

export default Success;
