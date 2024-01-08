"use client"

import { useLocale } from "next-intl";
import { FC } from "react";
import { Box, Divider, ListItem, Typography } from "@mui/material";
import { getTranslation } from "@/utils/getTranslation";
import { AttributesListItemProps } from "./types";
import { styles } from "./AttributesListItem.styles";

const AttributesListItem: FC<AttributesListItemProps> = ({ itemKeys, itemValues, defaultValue, defaultKey }) => {
  const locale = useLocale();
  const attributeGroupName = getTranslation(locale, itemKeys, defaultKey);
  const attributeValue = getTranslation(locale, itemValues, defaultValue);
  return (
    <>
      <ListItem>
        <Box sx={styles.row}>
          <Typography variant="body2">{attributeGroupName}</Typography>
          <Typography variant="body2">{attributeValue}</Typography>
        </Box>
      </ListItem>
      <Divider />
    </>

  )
}

export default AttributesListItem;