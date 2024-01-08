import { MediaSourceType } from "@/types/page";

export type AuthTemplateProps = {
  isImageLeftAligned?: boolean;
  isImageRightAligned?: boolean;
  logoImage: MediaSourceType
  sideImage?: MediaSourceType
  form?: React.ReactNode
  backBtnText?: string
  backBtnLink?: string
}