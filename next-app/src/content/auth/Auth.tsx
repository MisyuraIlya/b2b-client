import dynamic from "next/dynamic";
import { FC } from "react";
import getComponent from "@/utils/getComponent";
import { IPageComponents } from "@/types/page";

const AuthImageLeft = dynamic(() => import("./templates/AuthImageLeft"));
const AuthImageRight = dynamic(() => import("./templates/AuthImageRight"));
const AuthNoImage = dynamic(() => import("./templates/AuthNoImage"));

const templates = {
  AuthImageLeft,
  AuthImageRight,
  AuthNoImage
}

const Auth: FC<IPageComponents> = (props) => {
  const Component = getComponent(templates, props.template.name)
  return <Component {...props} />
}

export default Auth;