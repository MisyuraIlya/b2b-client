"use client";
import { IAction } from '@/types/store';
import { IAuthContext, InitialAuthState } from '../types';

const emptyState = {
  someState: '',
  form: ''
}

export const initialContext: IAuthContext = {
  ...emptyState,
}

export const initialState: InitialAuthState = {
  ...emptyState
}

const authReducer = (state: InitialAuthState, action: IAction) => {
  switch (action.type) {
    case "SET_SOME_STATE":
      console.log("SET_SOME_STATE", action.payload);
      return {
        ...state,
        someState: action.payload.data
      };

    default:
      throw new Error(`No case for type ${action.type} found in authReducer.`);
  }
}
export default authReducer