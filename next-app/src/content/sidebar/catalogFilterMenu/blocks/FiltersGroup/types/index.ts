import { FilterGroup } from "../../../types"

export type FilterGroupProps = {
  data: FilterGroup;
  clearFilters: (group: FilterGroup) => void;
  handleChangeFilters: (filterId: number) => void;
  filters: number[] | null;
}