"use client"

import dynamic from "next/dynamic"
import React from "react"

const MapBackground = dynamic(() => import("./MapBackground"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-app-bg animate-pulse" />,
})

export function Map({ viewId }: { viewId: string }) {
  return <MapBackground viewId={viewId} />
}

