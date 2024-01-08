"use client"

import { useLocale } from "next-intl";
import { FC } from "react";
import { Chip } from "@mui/material";
import { getTranslation } from "@/utils/getTranslation";
import { LabelProps } from "./types";

const Label: FC<LabelProps> = ({ data, size }) => {
  const locale = useLocale();
  const name = getTranslation(locale, data.label.translations, data.label.name);
  return (
    <Chip sx={{ backgroundColor: data.label.bgColor, color: data.label.textColor }} label={name} size={size} />
  )
};

export default Label;