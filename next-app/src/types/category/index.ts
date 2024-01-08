import { Translations } from "../common";

export type Category = Translations & {
  client: string;
  children: Category[] | [];
  id: number;
  name: string;
}
