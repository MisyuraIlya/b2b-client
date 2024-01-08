import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import { EmailControllerProps } from '../types'

const EmailController: FC<EmailControllerProps> = ({
  label,
  placeholder,
  control,
  required = false,
  sx = null
}) => {
  const t = useTranslations()

  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState: { invalid, error } }) => (
        <TextField
          fullWidth
          placeholder={placeholder}
          required={required}
          id="email"
          label={label}
          autoComplete="email"
          error={!!error}
          helperText={error && t(error.message)}
          sx={sx}
          {...field}
        />
      )}
    />
  )
}

export default EmailController
