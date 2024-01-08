"use client"
import { useLocale } from "next-intl";
import { FC } from "react";
import { ListSubheader } from "@mui/material";
import { getTranslation } from "@/utils/getTranslation";
import { AttributesSubheaderProps } from "./types";

const AttributesSubheader: FC<AttributesSubheaderProps> = ({ translations, defaultValue }) => {
  const locale = useLocale();
  const value = getTranslation(locale, translations, defaultValue)
  return (
    <ListSubheader sx={{ position: 'relative' }}>
      {value}
    </ListSubheader>
  )
}

export default AttributesSubheader;