"use client"

import { useTranslations } from "next-intl";
import { FC } from "react";
import { Box, MobileStepper, Typography } from "@mui/material";
import { CURRENCY } from "@/utils/currency";
import { CreditLimitProps } from "./types";
import { styles } from './CreditLimit.styles';

const CreditLimit: FC<CreditLimitProps> = ({ total, limit }) => {
  const t = useTranslations();
  const isLimitReached = total >= limit;
  return (
    <Box sx={styles.container} >
      <Box sx={styles.header}>
        <Typography sx={[styles.label, styles.limit]} variant="body2">
          {t('CART_LABEL_CREDIT_LIMIT')}
        </Typography>
        <Typography sx={styles.limit} variant="body2">
          {`${total.toFixed(2)}/${limit}`}
        </Typography>
      </Box>
      <MobileStepper
        activeStep={Math.min(Math.trunc(total), limit) - 1}
        steps={limit}
        position="static"
        variant="progress"
        nextButton={null}
        backButton={null}
        sx={styles.limitProgress}
        LinearProgressProps={{
          color: isLimitReached ? 'error' : 'info'
        }}
      />
      <Typography variant="caption" sx={[styles.label, styles.message]}>
        {isLimitReached ? t('CART_LABEL_REACHED_LIMIT') : t('CART_LABEL_REMAINING_LIMIT', { value: `${CURRENCY}${(limit - total).toFixed(2)}` })}
      </Typography>
    </Box>
  )
}

export default CreditLimit;