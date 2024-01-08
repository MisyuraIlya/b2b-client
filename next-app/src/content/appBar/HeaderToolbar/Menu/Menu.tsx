"use client"
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { FC } from "react";
import { Box, Typography } from "@mui/material";
import DynamicMuiComponent from "@/components/DynamicMuiComponent";
import Link from "@/components/Link";
import { TopBarItem } from "@/types/initData";
import { styles } from "./Menu.styles";

const Menu: FC<TopBarItem> = ({ menu, mui}) =>{
	const t = useTranslations();

	const pathname = usePathname()

	const isActiveLink = (path: string) => {
    return pathname === path
  }

	return (
		<DynamicMuiComponent data={mui}>
			{menu?.clientPages?.map(({id, path, translation}) => {
				const href = path === '/' ? path : `/${path}`;
				return (
					<Link key={id} href={href}>
						<Typography
							variant="body2"
							sx={{ ...styles.link, ...(isActiveLink(href) ? styles.activeLink : {}) }}>
							{t(translation)}
						</Typography>
					</Link>
				)
			})}
		</DynamicMuiComponent>
	)

}

export default Menu