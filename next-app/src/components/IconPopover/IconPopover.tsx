"use client"
import { FC, useState } from 'react'
import { Box, Popover } from '@mui/material'
import { IconPopoverProps } from './types'
import { styles } from './IconPopover.styles'

const IconPopover: FC<IconPopoverProps> = ({ children, icon, sx = null }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={[styles.iconWrapper, sx]}
      >
        {icon}
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={styles.popover}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {children}
      </Popover>
    </>
  )
}

export default IconPopover
