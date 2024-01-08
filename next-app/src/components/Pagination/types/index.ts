import { MuiStyle } from "@/types/mui";

export type PaginationProps = {
  page: number;
  sx?: MuiStyle;
  totalPages: number;
  label?: string;
  perPageOptions: Array<number>;
  perPage: number;
  disabled?: boolean;
  changePagination: (page: number, perPage: number) => void;
}