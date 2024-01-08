import dynamic from "next/dynamic";
import { FC } from "react";
import DynamicMuiComponent from "@/components/DynamicMuiComponent/DynamicMuiComponent";
import getComponent from "@/utils/getComponent";
import { TopBar, TopBarItem } from "@/types/initData";
import { ComponentsMap } from "@/types/layout";


const ImageLink = dynamic(
	() => import("./ImageLink")
)

const Menu = dynamic(
	() => import("./Menu")
)

const ComponentGroup = dynamic(
	() => import("./ComponentGroup")
)

const toolbarComponents: ComponentsMap<TopBarItem> = {
	ImageLink,
	Menu,
	ComponentGroup
}


const HeaderToolbar: FC<TopBar> = ({ mui, topBarItems }) => {
	const toolbarContent = topBarItems.map((item) => {
		const Component = getComponent(toolbarComponents, item.type);
		return <Component key={item.id} {...item} />
	})

	return(
		<DynamicMuiComponent data={mui}>
			{toolbarContent}
		</DynamicMuiComponent>
		)
}

export default HeaderToolbar