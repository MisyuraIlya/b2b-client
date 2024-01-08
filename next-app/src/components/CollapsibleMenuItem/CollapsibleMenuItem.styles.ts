"use client"
import { MuiStyles } from "@/types/mui";

export const styles: MuiStyles = {
  accordionSummary: {
    padding: 0,
    flexDirection: 'row-reverse',
    height: 'fit-content',
    minHeight: '24px',
    '& > .MuiAccordionSummary-content': {
      margin: 0,
      '&.Mui-expanded': {
        margin: 0
      }
    },
    '& > .MuiAccordionSummary-expandIconWrapper': {
      transform: 'rotate(-90deg)',
      '&.Mui-expanded': {
        transform: 'rotate(0deg)',
      }
    },
    '&.Mui-expanded': {
      minHeight: '24px',
    }
  },
  accordionSummaryRtl: {
    '& > .MuiAccordionSummary-expandIconWrapper': {
      transform: 'rotate(90deg)',
    },
  },
  accordion: {
    boxShadow: 'none',
    marginBottom: (theme) => theme.spacing(2),
    '&:before': {
      display: 'none'
    },
    '&.Mui-expanded': {
      margin: 0
    }
  },
  accordionDetails: {
    py: 0
  }
}