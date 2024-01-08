"use client"
import { useTranslations } from "next-intl"
import { FC } from "react"
import { Button } from "@mui/material"
import Link from "@/components/Link";
import { NavActionProps } from "../types";
import { styles } from './NavButton.styles';

const NavButton: FC<NavActionProps> = ({ actionName, actionSource }) => {
  const t = useTranslations()
  return (
    <Link href={actionSource}>
      <Button sx={styles.button} variant="contained">
        {t(actionName)}
      </Button>
    </Link>
  )
}

export default NavButton
