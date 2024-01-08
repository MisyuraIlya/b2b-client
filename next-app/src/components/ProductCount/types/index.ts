export type ProductCountProps = {
  step: number;
  max: number;
  setCount: (count: string) => void;
  count: string;
  disabled?: boolean;
}