"use client"
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { ArrowBack } from "@mui/icons-material";
import { Box } from "@mui/material";
import ButtonLink from "@/components/ButtonLink";
import useSearchParams from "@/utils/useSearchParams";
import FormDescription from "../blocks/FormDescription";
import { PrevPage } from "./types";
import { styles } from "./CheckEmailForm.styles";

import { EMAIL, PREV_PAGE_QUERY } from "./constants";

const allowedPrevPages = ['sign-up', 'forgot-password'];

const CheckEmailForm: FC = () => {
  const params = useSearchParams();
  const prevPage = params.get(PREV_PAGE_QUERY) as PrevPage;
  const email = params.get(EMAIL) as string;
  const t = useTranslations();
  if (!prevPage || !allowedPrevPages.includes(prevPage)) {
    return notFound();
  }
  const getBackLinkText = () => {
    if (prevPage === PrevPage.signUp) {
      return t('SHOP_PAGE_BUTTON_BACK_TO_SIGN_UP');
    }
    return t('SHOP_PAGE_BUTTON_BACK_TO_FORGOT_PASSWORD');
  }
  const getDescriptionText = () => {
    if (prevPage === PrevPage.signUp) {
      return t('SHOP_PAGE_DESCRIPTION_CHECK_EMAIL_AFTER_SIGN_UP', { email });
    }
    return t('SHOP_PAGE_DESCRIPTION_CHECK_EMAIL_AFTER_FORGOT_PASSWORD', { email });
  }
  return <Box>
    <ButtonLink sx={styles.backLink} text={t(getBackLinkText())} link={`/${prevPage}`} startIcon={<ArrowBack />} />
    <FormDescription title={t('SHOP_PAGE_TITLE_CHECK_EMAIL')} description={getDescriptionText()} />
  </Box>
}
export default CheckEmailForm