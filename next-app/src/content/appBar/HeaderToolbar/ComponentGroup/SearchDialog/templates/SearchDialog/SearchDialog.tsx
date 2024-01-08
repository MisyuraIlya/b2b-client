"use client"
import { FC, MouseEvent, useState } from "react";
import { Search } from "@mui/icons-material";
import { IconButton, Popover } from "@mui/material";
import GlobalSearch from "@/components/GlobalSearch";
import { ComponentGroupItem } from "@/types/initData";
import { styles } from "./SearchDialog.styles";

const SearchDialog: FC<ComponentGroupItem> = (props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);	

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		if (anchorEl) {
			handleClear();
			return
		}
		setAnchorEl(event.currentTarget);
	};

	const handleClear = () => {
		setAnchorEl(null);
	}

	const open = !!anchorEl
	return (
		<>
			<IconButton onClick={handleClick}>
				<Search />
			</IconButton>
			<Popover
				id="simple-popover"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClear}
				anchorOrigin={{
					vertical: 'center',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'center',
					horizontal: 'right',
				}}
				disableScrollLock
				disableRestoreFocus
				disableEnforceFocus
				elevation={0}
				sx={styles.dialog}
			>
				<GlobalSearch autoFocus link={props.link} onClear={handleClear} />
			</Popover>
		</>
	)
}

export default SearchDialog