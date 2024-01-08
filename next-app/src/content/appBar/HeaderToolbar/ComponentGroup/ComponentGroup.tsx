import dynamic from "next/dynamic";
import { FC } from "react";
import DynamicMuiComponent from "@/components/DynamicMuiComponent";
import getComponent from "@/utils/getComponent";
import { ComponentGroupItem, TopBarItem } from "@/types/initData";
import { ComponentsMap } from "@/types/layout";

const SearchDialog = dynamic(
	() => import("./SearchDialog")
)
const Notification = dynamic(
	() => import("./Notification")
)
const LanguageSelectionDialog = dynamic(
	() => import("./LanguageSelectionDialog")
)
const Cart = dynamic(
	() => import("./Cart")
)
const ProfileIcon = dynamic(
	() => import("./ProfileIcon")
)

const groupComponents: ComponentsMap<ComponentGroupItem> = {
	searchDialog: SearchDialog,
	notification: Notification,
	languageSelectionDialog: LanguageSelectionDialog,
	cart: Cart,
	profileIcon: ProfileIcon,

}

const ComponentGroup: FC<TopBarItem> = ({ componentGroup, mui }) => {
	return (
		<DynamicMuiComponent data={mui}>
			{componentGroup?.componentGroupItems?.map((item) => {
				const Component = getComponent(groupComponents, item.component.name);

				return <Component key={item.id} {...item} />
			}
			)}
		</DynamicMuiComponent>
	)
}

export default ComponentGroup