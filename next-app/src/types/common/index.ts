export type Translation = {
  code: string;
  value: string;
}

export type Translations = {
  translations: Array<Translation>;
}

export type List<T>= {
  currentPage: number;
  data: T[];
  perPage: number;
  totalPages: number;
}