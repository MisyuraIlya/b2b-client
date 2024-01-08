import { ComponentType, ReactNode } from 'react';
import { IChildren } from '@/types/layout';
import { IPage } from "@/types/page";

export interface AuthProps {
  page: IPage;
}

export interface InitialAuthState {
  someState: string;
  form: string;
}

export interface IAuthContext extends InitialAuthState { }

export interface IAuthProvider extends IChildren {
  form: string;
}