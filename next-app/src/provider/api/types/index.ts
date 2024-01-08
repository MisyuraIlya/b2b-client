export interface IFetchDataProps {
  entrypoint: string,
  path: string,
  query?: object,
  options?: RequestInit
}