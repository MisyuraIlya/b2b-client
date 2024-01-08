"use client"
import dynamic from "next/dynamic";
import { FC } from "react";
import DynamicMuiComponent from "@/components/DynamicMuiComponent";
import getComponent from "@/utils/getComponent";
import { ComponentGroupItem } from "@/types/initData";
import { ComponentsMap } from "@/types/layout";

const SearchDialogTemplateComponent = dynamic(
	() => import("./templates/SearchDialog")
)

const templates: ComponentsMap<ComponentGroupItem> = {
	searchDialog: SearchDialogTemplateComponent
}

const SearchDialog: FC<ComponentGroupItem> = (props) =>{
	const { template } = props;
	const Component = getComponent(templates, template.name);
	return <DynamicMuiComponent data={props.mui}>
		<Component {...props} />
	</DynamicMuiComponent>

}

export default SearchDialog