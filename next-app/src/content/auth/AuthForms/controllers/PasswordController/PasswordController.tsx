import { useTranslations } from 'next-intl'
import React, { FC, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { PasswordControllerProps } from '../types'

const PasswordController: FC<PasswordControllerProps> = ({
  confirmPassword = false,
  label,
  placeholder,
  control,
  required = false,
  sx = null
}) => {
  const t = useTranslations()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleMouseDownUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const NAME = !confirmPassword
    ? 'password'
    : 'password_confirm'

  return (
    <Controller
      name={NAME}
      control={control}
      render={({ field, fieldState: { invalid, error } }) => (
        <TextField
          fullWidth
          placeholder={placeholder}
          required={required}
          type={showPassword ? 'text' : 'password'}
          id={NAME}
          label={label}
          autoComplete="current-password"
          error={!!error}
          helperText={error && t(error.message)}
          sx={sx}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onMouseDown={handleMouseDownUpPassword}
                  onMouseUp={handleMouseDownUpPassword}
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...field}
        />
      )}
    />
  )
}

export default PasswordController
