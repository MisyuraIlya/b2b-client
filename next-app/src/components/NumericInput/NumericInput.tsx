"use client"
import { ChangeEvent, FC } from 'react'
import { TextField } from '@mui/material'
import { NumericInputProps } from './types'
import { styles } from './NumericInput.styles'

const NumericInput: FC<NumericInputProps> = ({
  min,
  max,
  placeholder,
  value,
  onChange,
  disabled,
  sx = null
}) => {
  const MIN_AMOUNT = min
  const MAX_AMOUNT = max

  const setNewValue = (val: number | string) => {
    const number = +val as number;
    if (!isNaN(number)) {
      const numValue = Math.min(number, MAX_AMOUNT);
      if (numValue === MAX_AMOUNT) {
        onChange(MAX_AMOUNT);
      } else {
        onChange(val);
      }
    }
  }
  const changeValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setNewValue(e.target.value);
  const handleBlur = () => {
    const number = Math.max(parseFloat(`${value}`), MIN_AMOUNT);
    if (value === '') {
      if (!!placeholder) {
        onChange('')
      } else {
        onChange(MIN_AMOUNT)
      }
    } else if (!isNaN(number) && number >= MIN_AMOUNT) {
      if (number <= MAX_AMOUNT) {
        onChange(number)
      } else {
        onChange(MAX_AMOUNT)
        // (?) TO-DO: tip that maximum amount reached
      }
    }
  }

  return (
    <TextField
      size="small"
      inputProps={{
        inputMode: 'numeric',
        pattern: '[0-9]*',
        sx: !!placeholder ? styles.input : styles.no_placeholder_input,
      }}
      disabled={disabled}
      placeholder={
        placeholder && typeof placeholder === 'string' ? placeholder : ''
      }
      onBlur={handleBlur}
      onChange={changeValue}
      value={value}
      sx={[!!placeholder ? styles.textField : styles.no_placeholder_textField, sx]}
    />
  )
}

export default NumericInput
