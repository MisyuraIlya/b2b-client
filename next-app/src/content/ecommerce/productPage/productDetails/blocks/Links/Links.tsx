"use client"
import { useLocale } from "next-intl";
import { FC } from "react";
import { Box, Typography } from "@mui/material";
import Link from "@/components/Link";
import NextImage from "@/components/NextImage";
import { getTranslation } from "@/utils/getTranslation";
import { LinksProps } from "./types";
import { styles } from './Links.styles';

const Links: FC<LinksProps> = ({ data }) => {
  const locale = useLocale();
  return (
    <Box sx={styles.container}>
      {data.map((link) => (
        <Box component={Link} key={link.id} href={link.url} sx={styles.item}>
          <Box sx={styles.image}>
            <NextImage src={link.mediaObject?.pathToAsset} />
          </Box>
          <Typography variant="body2">
            {getTranslation(locale, link.translations)}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default Links;