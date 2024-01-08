import { Translation } from "@/types/common";

export const getTranslation = (locale: string, translations?: Array<Translation>, defaultValue?: string | null) => {
  return translations?.find((translation) => translation.code === locale)?.value || defaultValue || '';
}