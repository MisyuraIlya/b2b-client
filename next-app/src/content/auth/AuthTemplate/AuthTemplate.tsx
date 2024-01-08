"use client"
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { ArrowBack } from "@mui/icons-material"
import { Box, Grid, Paper, Typography } from '@mui/material'
import ButtonLink from '@/components/ButtonLink';
import DynamicImage from '@/components/DynamicImage/DynamicImage';
import { AuthTemplateProps } from './types';
import { styles } from './AuthTemplate.styles';

const SideImage = dynamic(() => import('./SideImage'));

const AuthTemplate: FC<AuthTemplateProps> = ({
  logoImage,
  sideImage,
  form,
  backBtnText,
  backBtnLink,
  isImageLeftAligned = false,
  isImageRightAligned = false
}) => {
  const t = useTranslations();
  const showBackBtn = !!backBtnLink && !!backBtnText

  return (
    <Grid container sx={styles.gridContainer}>
      <SideImage media={sideImage} isShow={isImageLeftAligned} />

      <Grid item xs={12} md={6} component={Paper} elevation={0} square>
        <Box sx={styles.boxContainer}>
          <Box sx={styles.logoImage} component={DynamicImage} media={logoImage} />

          {showBackBtn && (
            <ButtonLink text={backBtnText} link={backBtnLink} startIcon={<ArrowBack />} />
          )}

          {form}

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={styles.copyright}
          >
            {t("EXAMPLE: © COMPANY INFO")}
          </Typography>
        </Box>
      </Grid>

      <SideImage media={sideImage} isShow={isImageRightAligned} />
    </Grid>
  )
}

export default AuthTemplate
