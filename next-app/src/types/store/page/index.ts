import { IChildren } from "@/types/layout";
import { IPage } from "@/types/page";

export interface IPageProvider extends IChildren, IPageContext { }

export interface IPageContext {
  page: IPage | null,
}