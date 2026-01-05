import React from "react"
import { GLOBAL_SHELL } from "@/data/mockData"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

interface TopBarProps {
  currentView: string
  onViewChange: (viewId: string) => void
}

export function TopBar({ currentView, onViewChange }: TopBarProps) {
  const { left, center, right } = GLOBAL_SHELL.top_bar

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex h-[56px] items-center justify-between bg-app-bg/85 px-4 backdrop-blur-md border-b border-border-hairline">
      {/* Left: Logo */}
      <div className="flex items-center gap-3 w-[200px]">
        <div className="text-xl font-bold tracking-tight text-text-primary">
          {left.logo_text}
        </div>
        <div className="h-4 w-px bg-border-subtle" />
        <div className="text-xs font-medium text-text-muted uppercase tracking-wider">
          {left.logo_subtext}
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center">
        <div className="relative flex items-center w-[520px]">
          <div className="absolute left-3 text-text-muted">
            <Icon name={center.search_box.leading_icon || "search"} className="h-4 w-4" />
          </div>
          <input
            type="text"
            readOnly
            value={center.search_box.value_shown}
            className="h-10 w-full rounded-full bg-panel-raised border border-border-hairline pl-10 pr-10 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary/50"
          />
          <div className="absolute right-3 text-accent-primary cursor-pointer hover:text-white">
            <Icon name={center.search_box.trailing_icon || "crosshair"} className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Right: Quick Controls & Profile */}
      <div className="flex items-center gap-4 w-[200px] justify-end">
        <div className="flex items-center bg-panel-raised rounded-full p-1 border border-border-hairline">
          {right.quick_controls.map((control) => {
            const isSelected = currentView === control.id
            return (
              <button
                key={control.label}
                onClick={() => control.id && onViewChange(control.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  isSelected
                    ? "bg-text-primary text-app-bg shadow-sm"
                    : "text-text-muted hover:text-text-primary hover:bg-black/5"
                )}
              >
                <Icon name={control.icon} className="h-3.5 w-3.5" />
                <span>{control.label}</span>
              </button>
            )
          })}
        </div>
        <div className="h-8 w-8 rounded-full bg-panel-raised flex items-center justify-center border border-border-hairline text-text-secondary hover:text-white cursor-pointer">
          <Icon name={right.profile_icon} className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

