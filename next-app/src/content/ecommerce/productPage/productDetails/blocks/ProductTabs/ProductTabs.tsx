"use client"
import { useLocale } from "next-intl";
import { FC, SyntheticEvent, useState } from "react";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { getTranslation } from "@/utils/getTranslation";
import { ProductTabsProps } from "./types";
import { styles } from './ProductTabs.styles';

const ProductTabs: FC<ProductTabsProps> = ({ data }) => {
  const locale = useLocale();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Paper sx={styles.container}>
      <Tabs variant="scrollable" visibleScrollbar scrollButtons={false} sx={styles.tabs} value={value} onChange={handleChange}>
        {data.map((tab) => {
          const translation = getTranslation(locale, tab.translations);
          return <Tab key={translation} label={translation} />
        })}
      </Tabs>
      <Typography component="div" sx={styles.content} dangerouslySetInnerHTML={{ __html: getTranslation(locale, data[value]?.textTranslations) }} />
    </Paper>

  )
}

export default ProductTabs;