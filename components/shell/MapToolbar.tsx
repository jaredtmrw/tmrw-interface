import React from "react"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

const controls = [
  { type: "icon_button", icon: "plus", tooltip: "Zoom in" },
  { type: "icon_button", icon: "minus", tooltip: "Zoom out" },
  { type: "icon_button", icon: "layers", tooltip: "Layers" },
  { type: "icon_button", icon: "compass", tooltip: "Reset view" },
]

export function MapToolbar() {
  return (
    <div className="absolute top-[72px] left-4 z-40 flex flex-col gap-2">
      <div className="flex flex-col bg-panel-raised/90 backdrop-blur-md rounded-lg border border-border-hairline p-1 shadow-panel">
        {controls.map((control, i) => (
          <button
            key={control.icon}
            className={cn(
              "p-2 text-text-secondary hover:text-text-primary hover:bg-black/5 rounded-md transition-colors",
              i < controls.length - 1 && "border-b border-border-hairline rounded-none hover:rounded-sm"
            )}
            title={control.tooltip}
          >
            <Icon name={control.icon} className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  )
}

