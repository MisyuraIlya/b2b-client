import * as Flags from "country-flag-icons/react/1x1";
import {DirectionEnum} from "@/config/direction";
import {Protocol} from '@/config/protocol';

export interface ISettings {
  locales: string[],
  defaultLocale: string,
  defaultDirection: string,
  clientId: string,
  languages: ILanguage[]
}
export interface IHost {
  protocol: Protocol,
  domain: string
}
export interface IConfig {
  domain: string,
  clientId: string,
  locales: string[],
  languages: ILanguage[],
  defaultLanguage: string,
  defaultDirection: Direction,
}
export interface ILanguage {
  name: string,
  code: string,
  direction: Direction,
  countryCode: keyof typeof Flags
}
export type Direction = DirectionEnum