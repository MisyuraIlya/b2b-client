"use client"
import { FC, ReactNode } from "react";
import * as MUI from '@mui/material';
import getMuiProps from "@/utils/getMuiProps";
import { Mui } from "@/types/page";
import { DynamicMuiComponentProps } from "./types";

const EmptyComponent = ({ children }: { children: ReactNode }) => <>{children}</>

const getComponent = (componentName?: Mui['component']) => {
  if (componentName) {
    return MUI[componentName] as FC<{ children?: ReactNode }>
  }
  return EmptyComponent;
}

const DynamicMuiComponent: FC<DynamicMuiComponentProps> = (props) => {
  const Component = getComponent(props.data?.component);
  const rootProps = getMuiProps(props.data)
  return <Component key={props.data?.id} {...rootProps}>
    {props.children}
  </Component>
}

export default DynamicMuiComponent;