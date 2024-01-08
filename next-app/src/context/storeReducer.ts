"use client";

import {DirectionEnum} from "@/config/direction";
import {IAction, InitialContext, InitialState} from '@/types/store';

const initialProps = {
  client: '',
  languages: [],
  direction: DirectionEnum.rtl
}
const emptyState = {
  someState: ''
}
export const initialState: InitialState = {
  ...emptyState
}
export const initialContext: InitialContext = {
  ...initialState,
  client: initialProps.client,
  languages: initialProps.languages,
  direction: initialProps.direction,
  prevPathname: ''
}

const storeReducer = (state: InitialState, action: IAction) => {
  switch (action.type) {
    case "SET_SOME_STATE":
      console.log("SET_SOME_STATE", action.payload);
      return {
        ...state,
        someState: action.payload.data
      };

    default:
      throw new Error(`No case for type ${action.type} found in storeReducer.`);
  }
}
export default storeReducer