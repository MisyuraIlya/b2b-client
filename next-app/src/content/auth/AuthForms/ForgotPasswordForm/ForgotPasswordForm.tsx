"use client"
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { FC, useState } from "react";
import { Control, DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, CircularProgress } from '@mui/material'
import ButtonLink from "@/components/ButtonLink";
import FormDescription from "../blocks/FormDescription";
import { PREV_PAGE_QUERY } from "../CheckEmailForm/constants";
import { VALIDATION_I18N_CONSTANTS } from '../constants'
import EmailController from "../controllers/EmailController";
import { PrevPage } from "../CheckEmailForm/types";
import { AuthFormFields } from "../types";
import { styles } from './ForgotPasswordForm.styles';

const schema = yup.object({
  email: yup
    .string()
    .required(VALIDATION_I18N_CONSTANTS.EMAIL_REQUIRED)
    .email(VALIDATION_I18N_CONSTANTS.EMAIL_VALID),
})

const defaultValues: DefaultValues<AuthFormFields> = {
  email: '',
}

const ForgotPasswordForm: FC = () => {
  const t = useTranslations();
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<Required<Pick<AuthFormFields, 'email'>>>({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<AuthFormFields> = async (data) => {
    setLoading(true)

    // TO-DO: remove TEMPORARY:
    router.push(`/check-email?${PREV_PAGE_QUERY}=${PrevPage.forgotPassword}`);

    // try {
    //   const res = await AuthService.resetPassword(data)

    //   if (res.status === 200) {
    //     router.push({
    //       pathname: `/${ROUTES.AUTH.CHECK_EMAIL}`,
    //       query: {
    //         email: data.email,
    //         from: ROUTES.AUTH.FORGOT_PASSWORD,
    //       } as CheckEmailPageConfig
    //     }, `/${ROUTES.AUTH.CHECK_EMAIL}`);
    //   } else {
    //     // TO-DO: show errors
    //     setError('email', {
    //       type: 'manual',
    //       message: 'Dont Forget Your Username Should Be Cool!',
    //     })
    //   }
    // } catch (err) {
    //   console.log('===>> ~ err', err)
    //   // TO-DO: show errors
    //   setError('email', {
    //     type: 'manual',
    //     message: 'Dont Forget Your Username Should Be Cool!',
    //   })
    // }

    setLoading(false)
  }

  return (
    <Box>
      <ButtonLink sx={styles.backLink} text={t('SHOP_PAGE_BUTTON_BACK_TO_LOGIN')} link="/login" startIcon={<ArrowBack />} />
      <FormDescription title={t('SHOP_PAGE_TITLE_FORGOT_PASSWORD')} description={t('SHOP_PAGE_DESCRIPTION_FORGOT_PASSWORD')} />
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

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress color="inherit" size={16} />}
          sx={styles.submitBtn}
        >
          {t('SHOP_FORM_BUTTON_SEND_RESET_INSTRUCTIONS')}
        </Button>
      </Box>

    </Box>
  )
}
export default ForgotPasswordForm