"use client";

import { createContext, useContext, useReducer } from 'react';
import authReducer, { initialContext, initialState } from '@/content/auth/context/authReducer';
import { IAuthContext, IAuthProvider } from '../types';

const AuthStoreContext = createContext<IAuthContext>(initialContext)

export const AuthProvider = ({ children, form }: IAuthProvider) => {

  const [state, dispatch] = useReducer(authReducer, initialState);

  const setSomeState = (record: string) => {
    dispatch({
      type: "SET_SOME_STATE",
      payload: {
        data: record
      }
    })
  }
  const value: IAuthContext = {
    ...state,
    form,
  }
  return <AuthStoreContext.Provider value={value}>{children}</AuthStoreContext.Provider>
}

export const useAuthStore = (): IAuthContext => {
  const context: IAuthContext = useContext(AuthStoreContext)
  if (context === undefined) {
    throw new Error("useDiscover must be used within DiscoverContext");
  }
  return context;
}
