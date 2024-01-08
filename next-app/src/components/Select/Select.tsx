"use client"
import { FC } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material'
import {
  Box,
  FormControl,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material'
import { SelectProps } from './types'
import { styles } from './Select.styles'

const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  disabled,
  containerSx = null
}) => {
  const handleChange = (event: SelectChangeEvent<number | string>) => {
    onChange?.(event);
  }

  return (
    <Box sx={[styles.wrapper, containerSx]}>
      <FormControl fullWidth size="small" sx={styles.form}>
        <MuiSelect disabled={disabled} value={value} onChange={handleChange} IconComponent={KeyboardArrowDown} >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </Box>
  )
}

export default Select
