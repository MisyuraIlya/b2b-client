import {ComponentType, ReactNode} from 'react';
import {Direction} from '@/types/config';

export interface IChildren {
  children: ReactNode
}
export interface RootLayoutProps extends IChildren {}
export interface AppProviderProps extends IChildren {
  dir: Direction;
}
export type ComponentsMap<T> = Record<string, ComponentType<T>>
export type GridButtonHorizontalPosition = 'left' | 'center' | 'right';
export type GridButtonVerticalPosition = 'top' | 'bottom';
export type GridTitleSubtitlePosition = 'left' | 'center' | 'right';
