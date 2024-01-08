import dynamic from "next/dynamic";
import { FC } from "react";
import DynamicMuiComponent from "@/components/DynamicMuiComponent";
import getComponent from "@/utils/getComponent";
import { ComponentGroupItem } from "@/types/initData";
import { ComponentsMap } from "@/types/layout";

const ProfileTemplateComponent = dynamic(
	() => import("./templates/ProfileIcon")
)

const templates: ComponentsMap<ComponentGroupItem> = {
	profileIcon: ProfileTemplateComponent
}

const ProfileIcon: FC<ComponentGroupItem> = (props) => {
	const Component = getComponent(templates, props.template.name);
	return (
		<DynamicMuiComponent data={props.mui}>
			<Component {...props} />
		</DynamicMuiComponent>
	)

}

export default ProfileIcon