import useSearchParams from "./useSearchParams";

export default function useSearchParamsObject() {
  const searchParams = useSearchParams();
  let result: Record<string, string | string[]> = {};
  for (const [key, value] of searchParams.entries()) {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key] = [...result[key], value]
      } else {
        result[key] = [result[key] as string, value]
      }
    } else {
      result[key] = value;
    }
  }
  return result
}