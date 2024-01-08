import dynamic from "next/dynamic";
import { FC } from "react";
import getComponent from "@/utils/getComponent";
import { ComponentsMap } from "@/types/layout";
import { NavActionProps, NavActionsProps } from "./types";

const Button = dynamic(() => import('./button'));
const internalLink = dynamic(() => import('./internalLink'));

const templates: ComponentsMap<NavActionProps> = {
  button: Button,
  internalLink
}

const Actions: FC<NavActionsProps> = (props) => {
  const Component = getComponent(templates, props.actionType || '');
  return <Component actionName={props.actionName || ''} actionSource={props.actionSource || ''} />
}
export default Actions;