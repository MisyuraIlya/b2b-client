"use client"
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { FC } from "react";
import DynamicMuiComponent from "@/components/DynamicMuiComponent";
import getComponent from "@/utils/getComponent";
import { ComponentGroupItem } from "@/types/initData";
import { ComponentsMap } from "@/types/layout";

const CartIcon = dynamic(
	() => import("./templates/CartIcon")
)

const templates: ComponentsMap<ComponentGroupItem> = {
	cartIcon: CartIcon
}

const Cart: FC<ComponentGroupItem> = (props) => {
	const { data } = useSession();
	if (!data) {
		return null
	}
	const Component = getComponent(templates, props.template.name);
	return (
		<DynamicMuiComponent data={props.mui}>
			<Component {...props} />
		</DynamicMuiComponent>
	)

}

export default Cart