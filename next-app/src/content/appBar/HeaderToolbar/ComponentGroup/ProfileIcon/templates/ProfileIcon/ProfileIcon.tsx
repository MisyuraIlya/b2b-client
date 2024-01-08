"use client"
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next-intl/client";
import { FC } from "react";
import { Login } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import Link from "@/components/Link";
import { ComponentGroupItem } from "@/types/initData";

function stringToColor(string: string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name: string) {
	return {
		sx: {
			bgcolor: stringToColor(name),
			width: 24,
			height: 24,
			fontSize: 14
		},
		children: `${name[0]}`,
	};
}

const ProfileIcon: FC<ComponentGroupItem> = (props) => {
	const { data: session } = useSession();
	const router = useRouter();
	const renderContent = () => {
		if (session) {
			return (
				<IconButton onClick={() => {
					signOut({ redirect: false }).then(() => {
						router.refresh()
					})
				}}>
					<Avatar {...stringAvatar(session.user.email)} />
				</IconButton>
			)
		} else {
			return (
				<Link href="/login">
					<IconButton>
						<Login />
					</IconButton>
				</Link>
			)
		}
		// return props.link ? (
		// 	<Link href={props.link}>
		// 		<IconButton>
		// 			<Person />
		// 		</IconButton>
		// 	</Link>
		// ) : (
		// 	<IconButton>
		// 		<Person />
		// 	</IconButton>
		// )
	}
	return renderContent();
}

export default ProfileIcon