import { GlobalShell } from "@/components/shell/GlobalShell"

// Pass Map as children or handle inside shell
// Since Map is client side and GlobalShell is client side, they compose fine.
// But GlobalShell expects to control the view state.
// So I'll let GlobalShell instantiate the Map internally as I did in my last edit to GlobalShell.
// Or I can pass a component that accepts viewId.

export default function Home() {
  return (
    <GlobalShell />
  )
}
