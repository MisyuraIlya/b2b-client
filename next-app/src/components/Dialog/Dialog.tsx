"use client"
import { FC } from 'react';
import { Close } from '@mui/icons-material';
import { Dialog as MuiDialog, DialogContent, DialogTitle, IconButton, Zoom } from '@mui/material';
import { DialogProps } from './types';
import { styles } from './Dialog.styles';

const Dialog: FC<DialogProps> = ({ title, handleClose, open, children, containerSx = null }) => {
  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      sx={[styles.container, containerSx]}
      TransitionComponent={Zoom}
    >
      <DialogTitle id="dialog-title" sx={styles.title}>
        {title}
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </MuiDialog>
  );
}

export default Dialog;