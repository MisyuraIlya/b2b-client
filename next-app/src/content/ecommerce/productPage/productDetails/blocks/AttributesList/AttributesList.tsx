"use client"

import { useTranslations } from "next-intl";
import { FC, Fragment, useMemo } from "react";
import { List } from "@mui/material";
import { AttributesListProps, GroupedCharacteristics } from "./types";
import { styles } from './AttributesList.styles';

import AttributesListItem from "./AttributesListItem/AttributesListItem";
import AttributesSubheader from "./AttributesSubheader";

const AttributesList: FC<AttributesListProps> = ({ attributes, characteristics }) => {
  const t = useTranslations();
  const groupedCharacteristics = useMemo(() => {
    return Object.values(characteristics.reduce((acc, cur) => {
      const groupId = cur.productCharacteristicGroup.id;
      if (acc[groupId]) {
        return {
          ...acc,
          [groupId]: {
            ...acc[groupId],
            characteristics: [...acc[cur.productCharacteristicGroup.id].characteristics, { id: cur.id, translations: cur.translations, value: cur.value }]
          }
        }
      } else {
        return {
          ...acc,
          [groupId]: {
            group: cur.productCharacteristicGroup,
            characteristics: [{ id: cur.id, translations: cur.translations, value: cur.value }]
          }
        }
      }
    }, {} as GroupedCharacteristics))
  }, [characteristics]);
  return <List sx={styles.container}>
    <AttributesSubheader defaultValue={t('SHOP_PRODUCT_LABEL_ATTRIBUTES')} translations={[]} />
    {attributes.map((attribute) => (
      <AttributesListItem
        key={attribute.id}
        itemKeys={attribute.attribute.attributeGroup.translations}
        defaultValue={attribute.attribute.name}
        itemValues={attribute.attribute.translations}
        defaultKey={attribute.attribute.attributeGroup.name}
      />
    ))}
    {groupedCharacteristics.map((characteristicsGroup) => (
      <Fragment key={characteristicsGroup.group.id}>
        <AttributesSubheader translations={characteristicsGroup.group.translations} />
        {characteristicsGroup.characteristics.map((characteristic) => (
          <AttributesListItem
            key={characteristic.id}
            itemKeys={characteristic.translations}
            defaultValue={characteristic.value}
          />
        ))}
      </Fragment>
    ))}
  </List>
}

export default AttributesList;