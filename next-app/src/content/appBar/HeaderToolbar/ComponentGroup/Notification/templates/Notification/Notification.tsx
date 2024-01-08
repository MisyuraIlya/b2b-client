import { FC } from "react";
import { Notifications } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { ComponentGroupItem } from "@/types/initData";
import { styles } from "./Notiifcation.styles";

const Notification: FC<ComponentGroupItem> = (props) => (
	<IconButton>
		<Badge sx={styles.badge} color="primary" badgeContent={1}>
		 	<Notifications />
		</Badge>
	</IconButton>
)

export default Notification