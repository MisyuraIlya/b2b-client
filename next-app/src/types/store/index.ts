import {ReactNode} from 'react';
import {Direction, ILanguage} from '@/types/config';

export interface InitialState {
  someState: string
}
interface ICommonStoreProvider {
  client: string,
  languages: ILanguage[],
  direction: Direction
}
export interface InitialContext extends InitialState, ICommonStoreProvider {
  prevPathname: string
}
export interface IAction {
  type: string,
  payload: any
}
export interface IChildren {
  children: ReactNode
}
export interface IStoreProvider extends IChildren, ICommonStoreProvider {}