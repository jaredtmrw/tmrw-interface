"use client"

import React, { useState } from "react"
import { TopBar } from "./TopBar"
import { BottomBar } from "./BottomBar"
import { MapToolbar } from "./MapToolbar"
import { RightPanel } from "./RightPanel"
import { Map } from "@/components/map/Map"

interface GlobalShellProps {
  // children removed as it was unused
}

export function GlobalShell({}: GlobalShellProps) {
  // Default to first view
  const [currentView, setCurrentView] = useState("area_overview_watershed")

  // Function to handle view switching
  const handleViewChange = (viewId: string) => {
    setCurrentView(viewId)
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-app-bg text-text-primary font-sans">
      {/* Background Map Layer */}
      <div className="absolute inset-0 z-0">
        <Map viewId={currentView} />
      </div>

      {/* UI Overlays */}
      <TopBar currentView={currentView} onViewChange={handleViewChange} />
      <MapToolbar />
      
      <RightPanel viewId={currentView} />
      
      <BottomBar />
      
      {/* Scrim/Overlay effects could go here */}
    </div>
  )
}

