"use client"
import { useTranslations } from "next-intl";
import { FC } from "react";
import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { DirectionEnum } from "@/config/direction";
import { useStore } from "@/context/StoreContext";
import Link from "../Link";
import { BreadcrumbsItem, BreadcrumbsProps } from "./types";
import { styles } from './Breadcrumbs.styles';

const Breadcrumbs: FC<BreadcrumbsProps> = ({ data }) => {
  const t = useTranslations();
  const { direction } = useStore();
  const rootElement: BreadcrumbsItem = {
    link: '/',
    text: t('SHOP_MENU_PAGE_LABEL_HOME')
  };

  return (
    <MuiBreadcrumbs
      sx={styles.container}
      separator={<NavigateNext sx={direction === DirectionEnum.rtl ? styles.rtlIcon : null} fontSize="small" />}
    >
      <Link key={rootElement.link} href={rootElement.link}>
        <Typography variant="body2">
          {rootElement.text}
        </Typography>
      </Link>
      {data.map((item, index) => {
        if (item.link && index < data.length - 1) {
          return (
            <Link key={item.link} href={item.link}>
              <Typography variant="body2">
                {item.text}
              </Typography>
            </Link>
          )
        }
        return (
          <Typography key={item.text} variant="body2">
            {item.text}
          </Typography>
        )
      })}
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs;