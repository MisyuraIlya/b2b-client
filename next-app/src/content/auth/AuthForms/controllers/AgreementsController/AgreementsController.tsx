import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'
import { CommonControllerProps } from '../types'
import { styles } from './AgreementsController.styles'

const AgreementsController: FC<CommonControllerProps> = ({
  label,
  control,
  required = false,
}) => {
  const t = useTranslations()

  return (
    <Controller
      name="agreements"
      control={control}
      render={({ field, fieldState: { invalid, error } }) => (
        <FormControl required={required} error={!!error} sx={styles.control}>
          <FormControlLabel
            label={label}
            sx={styles.controlLabel}
            control={
              <Checkbox
                required={required}
                id="agreements"
                {...field} />
            }
          />
          {error && (
            <FormHelperText error={!!error}>
              {t(error.message)}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}

export default AgreementsController
