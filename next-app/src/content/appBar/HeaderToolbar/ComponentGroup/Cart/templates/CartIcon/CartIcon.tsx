"use client"
import { FC } from "react";
import { ShoppingCart } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import Link from "@/components/Link";
import { useCartStore } from "@/context/CartContext/CartContext";
import { ComponentGroupItem } from "@/types/initData";
import { styles } from "./CartIcon.styles";

const CartIcon: FC<ComponentGroupItem> = (props) => {
	const { cart } = useCartStore();
	const count = cart?.productCarts.length ?? 0;
	return props.link ? (
		<Link href={props.link}>
			<IconButton>
				<Badge sx={styles.badge} color="primary" badgeContent={count}>
					<ShoppingCart />
				</Badge>
			</IconButton>
		</Link>
	) : (
		<IconButton>
				<Badge sx={styles.badge} color="primary" badgeContent={count}>
					<ShoppingCart />
				</Badge>
			</IconButton>
		)
}

export default CartIcon