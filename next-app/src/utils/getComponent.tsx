import { ComponentsMap } from "@/types/layout"
const EmptyComponent = () => <></>
export default function getComponent<T>(components: ComponentsMap<T>, name?: string) {
  if (!name) {
    return EmptyComponent;
  }
  return components[name] || EmptyComponent;
}