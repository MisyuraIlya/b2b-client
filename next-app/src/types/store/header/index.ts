"use client"
import { InitData } from '@/types/initData';
import { IChildren } from '@/types/layout';

export interface IHeaderContext {
  data?: InitData,
}

export interface IHeaderProvider extends IChildren, IHeaderContext { }