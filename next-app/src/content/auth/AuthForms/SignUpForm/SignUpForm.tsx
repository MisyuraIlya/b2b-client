"use client"
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import Link from 'next-intl/link';
import { FC, useState } from "react";
import { Control, DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import ButtonLink from "@/components/ButtonLink";
import { useStore } from "@/context/StoreContext";
import customerApi from "@/provider/api/customer";
import urls from "@/provider/api/urls";
import FormDescription from "../blocks/FormDescription";
import { EMAIL, PREV_PAGE_QUERY } from "../CheckEmailForm/constants";
import { REGEX_RULES, VALIDATION_I18N_CONSTANTS } from "../constants";
import AgreementsController from "../controllers/AgreementsController/AgreementsController";
import EmailController from "../controllers/EmailController";
import PasswordController from "../controllers/PasswordController";
import { STATUS } from "../LoginForm/constants";
import { PrevPage } from "../CheckEmailForm/types";
import { Status } from "../LoginForm/types";
import { AuthFormFields } from "../types";
import { styles } from './SignUpForm.styles';

const schema = yup.object({
  email: yup
    .string()
    .required(VALIDATION_I18N_CONSTANTS.EMAIL_REQUIRED)
    .email(VALIDATION_I18N_CONSTANTS.EMAIL_VALID),

  password: yup
    .string()
    .required(VALIDATION_I18N_CONSTANTS.PASSWORD_REQUIRED)
    .min(8, VALIDATION_I18N_CONSTANTS.PASSWORD_MIN_8)
    .matches(
      REGEX_RULES.AT_LEAST_1_LOWERCASE_LETTER,
      VALIDATION_I18N_CONSTANTS.PASSWORD_UPPER_AND_LOWERCASE
    )
    .matches(
      REGEX_RULES.AT_LEAST_1_UPPERCASE_LETTER,
      VALIDATION_I18N_CONSTANTS.PASSWORD_UPPER_AND_LOWERCASE
    )
    .matches(
      REGEX_RULES.AT_LEAST_1_DIGIT,
      VALIDATION_I18N_CONSTANTS.PASSWORD_1_DIGIT
    ),

  password_confirm: yup
    .string()
    .required(VALIDATION_I18N_CONSTANTS.PASSWORD_REQUIRED)
    .oneOf(
      [yup.ref('password')],
      VALIDATION_I18N_CONSTANTS.PASSWORD_CONFIRM_MATCH
    ),

  agreements: yup
    .boolean()
    .oneOf([true], VALIDATION_I18N_CONSTANTS.AGREEMENTS_REQUIRED),
})

const defaultValues: DefaultValues<AuthFormFields> = {
  email: '',
  password: '',
  password_confirm: '',
  agreements: false,
}

const SignUpForm: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const t = useTranslations();
  const { client } = useStore();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<Required<Pick<AuthFormFields, 'email' | 'password' | 'password_confirm'>>>({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<AuthFormFields> = async (data, e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const resp = await customerApi.fetch(urls.customer.register, { method: 'POST', body: JSON.stringify({ client, email: data.email, password: data.password }) })
      // router.push(`/check-email?${PREV_PAGE_QUERY}=${PrevPage.signUp}&${EMAIL}=${data.email}`);
      router.push(`/login?${STATUS}=${Status.registered}`);

    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box>
      <FormDescription title={t('SHOP_PAGE_TITLE_SIGN_UP')} description={t('SHOP_PAGE_DESCRIPTION_SIGN_UP')} />
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
          sx={{ ...styles.field, ...styles.emailField }}
        />

        <PasswordController
          label={t('SHOP_FORM_INPUT_LABEL_PASSWORD')}
          placeholder={t('SHOP_FORM_INPUT_PLACEHOLDER_PASSWORD')}
          control={control as Control<AuthFormFields>}
          required
          sx={styles.field}
        />

        <PasswordController
          label={t('SHOP_FORM_INPUT_LABEL_PASSWORD_CONFIRM')}
          placeholder={t('SHOP_FORM_INPUT_PLACEHOLDER_PASSWORD_CONFIRM')}
          control={control as Control<AuthFormFields>}
          confirmPassword
          required
          sx={styles.field}
        />

        <AgreementsController
          label={
            <Typography variant="body2">
              {t.rich('SHOP_PAGE_TERMS_OF_SERVICE', {
                terms: (chunks) => (
                  <Box sx={styles.agreementsLink} component={Link} href="#">
                    {chunks}
                  </Box>
                ),
                privacy: (chunks) => (
                  <Box sx={styles.agreementsLink} component={Link} href="#">
                    {chunks}
                  </Box>
                )
              })}
            </Typography>
          }
          control={control as Control<AuthFormFields>}
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress color="inherit" size={16} />}
          sx={styles.submitBtn}
        >
          {t('SHOP_PAGE_TITLE_SIGN_UP')}
        </Button>

        <Grid container spacing={0.5} sx={styles.additionalPageDescription}>
          <Box key={'SHOP_FORM_TEXT_ALREADY_A_MEMBER'}>
            <Typography variant="body2">
              {t('SHOP_FORM_TEXT_ALREADY_A_MEMBER')}
            </Typography>
          </Box>
          <Box key={'SHOP_PAGE_TITLE_LOGIN'} sx={styles.additionalPageBox}>
            <ButtonLink
              text={t('SHOP_PAGE_TITLE_LOGIN')}
              link="/login"
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}
export default SignUpForm