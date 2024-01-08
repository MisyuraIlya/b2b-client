"use client"
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from 'next-intl'
import { useRouter } from 'next-intl/client'
import { useState } from 'react'
import { Control, DefaultValues, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import ButtonLink from '@/components/ButtonLink'
import FormDescription from '../blocks/FormDescription/FormDescription'
import { VALIDATION_I18N_CONSTANTS } from '../constants'
import EmailController from '../controllers/EmailController'
import PasswordController from '../controllers/PasswordController/PasswordController'
import { AuthFormFields } from '../types'
import { Status } from "./types";
import { styles } from './LoginForm.styles';

import { STATUS } from "./constants";

const schema = yup.object({
  email: yup
    .string()
    .required(VALIDATION_I18N_CONSTANTS.EMAIL_REQUIRED)
    .email(VALIDATION_I18N_CONSTANTS.EMAIL_VALID),

  password: yup.string().required(VALIDATION_I18N_CONSTANTS.PASSWORD_REQUIRED),
})

const defaultValues: DefaultValues<AuthFormFields> = {
  email: '',
  password: '',
}

const LoginForm = ({ }) => {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const status = params.get(STATUS) as Status;

  const onSubmit: SubmitHandler<AuthFormFields> = async (data, e) => {
    e?.preventDefault();
    setLoading(true)
    try {
      const resp = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      });
      if (resp?.ok) {
        router.push('/');
      } else {
        setLoading(false)
        if (resp?.status === 401) {
          setError('email', { message: resp?.error ?? ''})
          setError('password', { message: resp?.error ?? ''})
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<Required<Pick<AuthFormFields, 'email' | 'password'>>>({
    defaultValues,
    resolver: yupResolver(schema),
  })
  const t = useTranslations()
  return (
    <Box>
      <FormDescription title={t('SHOP_PAGE_TITLE_LOGIN')} description={t('SHOP_PAGE_DESCRIPTION_LOGIN')} />
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <EmailController
          label={t('SHOP_FORM_INPUT_LABEL_EMAIL')}
          placeholder={t('SHOP_FORM_INPUT_PLACEHOLDER_EMAIL')}
          control={control as Control<AuthFormFields>}
          required
          sx={styles.emailField}
        />

        <PasswordController
          label={t('SHOP_FORM_INPUT_LABEL_PASSWORD')}
          placeholder={t('SHOP_FORM_INPUT_PLACEHOLDER_PASSWORD')}
          control={control as Control<AuthFormFields>}
          required
          sx={styles.passwordField}
        />

        <Grid container>
          <Grid item xs />
          <Grid item>
            <ButtonLink
              text={t('SHOP_PAGE_TITLE_FORGOT_PASSWORD')}
              link="/forgot-password"
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress color="inherit" size={16} />}
          sx={styles.submitBtn}
        >
          {t('SHOP_PAGE_TITLE_LOGIN')}
        </Button>

        <Grid container spacing={0.5} sx={styles.additionalPageDescription}>
          <Box key={'SHOP_FORM_TEXT_DONT_HAVE_ACCOUNT'}>
            <Typography variant="body2">
              {t('SHOP_FORM_TEXT_DONT_HAVE_ACCOUNT')}
            </Typography>
          </Box>
          <Box key={'SHOP_PAGE_TITLE_SIGN_UP'} sx={styles.additionalPageBox}>
            <ButtonLink
              text={t('SHOP_PAGE_TITLE_SIGN_UP')}
              link="/sign-up"
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

export default LoginForm
