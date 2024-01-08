import { ReactNode } from "react";
import { Mui } from "@/types/page";

export type CarouselProps<T> = {
  slidesPerView: number;
  spaceBetweenSlides: number;
  data: T[];
  renderItem: (item: T) => ReactNode;
  mui?: Mui;
  title: string;
  action?: ReactNode;
  isLoading?: boolean;
  loadingComponent?: ReactNode;
}