"use client"
import { FC, useEffect, useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { DirectionEnum } from "@/config/direction";
import { useStore } from "@/context/StoreContext";
import { CollapsibleMenuItemProps } from "./types";
import { styles } from './CollapsibleMenuItem.styles';

const CollapsibleMenuItem: FC<CollapsibleMenuItemProps> = ({
  title,
  children,
  expanded,
  accordionSx = null,
  accordionDetailsSx = null,
  accordionSummarySx = null,
  onExpand,
  defaultExpanded
}) => {
  const { direction } = useStore();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || Boolean(expanded));
  useEffect(() => {
    setIsExpanded((prev) => {
      if (!prev && defaultExpanded) {
        return defaultExpanded;
      }
      return prev
    })
  }, [defaultExpanded])
  return (
    <Accordion
      onChange={(e, val) => {
        onExpand?.(val);
        setIsExpanded(val)
      }}
      expanded={isExpanded}
      sx={[styles.accordion, accordionSx]}
    >
      <AccordionSummary sx={[styles.accordionSummary, direction === DirectionEnum.rtl ? styles.accordionSummaryRtl : null, accordionSummarySx]} expandIcon={<ExpandMore />}>
        {title}
      </AccordionSummary>
      <AccordionDetails sx={[styles.accordionDetails, accordionDetailsSx]}>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

export default CollapsibleMenuItem;