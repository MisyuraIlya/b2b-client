import dynamic from "next/dynamic";
import { FC } from "react";
import DynamicMuiComponent from "@/components/DynamicMuiComponent";
import getComponent from "@/utils/getComponent";
import { ComponentGroupItem } from "@/types/initData";
import { ComponentsMap } from "@/types/layout";
import { LanguageSelectionDialogProps } from "./types";

const LanguageSelectionDialogStandard = dynamic(
	() => import("./templates/LanguageSelectionDialogStandard")
)

const templates: ComponentsMap<LanguageSelectionDialogProps> = {
	languageSelectionDialogStandard: LanguageSelectionDialogStandard
}

const LanguageSelectionDialog: FC<ComponentGroupItem> = async (props) => {
	const Component = getComponent(templates, props.template.name);
	return (
		<DynamicMuiComponent data={props.mui}>
			<Component data={props} />
		</DynamicMuiComponent>
	)

}

export default LanguageSelectionDialog