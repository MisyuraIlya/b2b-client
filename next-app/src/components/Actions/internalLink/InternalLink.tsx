import { useTranslations } from "next-intl";
import { FC } from "react";
import { Typography } from "@mui/material";
import Link from "@/components/Link";
import { NavActionProps } from "../types";
import { styles } from './InternalLink.styles';

const InternalLink: FC<NavActionProps> = ({ actionName, actionSource }) => {
  const t = useTranslations();
  return (
    <Link href={actionSource}>
      <Typography variant="body2" sx={styles.link}>
        {t(actionName)}
      </Typography>
    </Link>
  )
}

export default InternalLink;