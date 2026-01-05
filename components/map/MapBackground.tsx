"use client"

import React, { useEffect, useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { PAGES } from "@/data/mockData"
import L from "leaflet"

// Fix for default markers in Next.js
// @ts-expect-error - _getIconUrl is not defined in type definition but exists at runtime
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create a modern SVG pin icon
const createPinIcon = (color: string, isHome: boolean = false) => {
  const size = isHome ? 40 : 28; // Slightly smaller for callouts
  const shadowOpacity = 0.2;
  
  return L.divIcon({
    className: 'custom-pin-icon',
    html: `
      <div style="width: ${size}px; height: ${size}px; position: relative; filter: drop-shadow(0 4px 6px rgba(0,0,0,${shadowOpacity}));">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21C16 17.5 19 14.402 19 10.5C19 6.35786 15.6421 3 12 3C8.35786 3 5 6.35786 5 10.5C5 14.402 8 17.5 12 21Z" 
                fill="${color}" stroke="white" stroke-width="1.5"/>
          ${isHome ? 
            `<path d="M9 11L12 8L15 11M9 13V16H15V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>` :
            `<circle cx="12" cy="10.5" r="2.5" fill="white"/>`
          }
        </svg>
      </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap()
  
  useEffect(() => {
    map.invalidateSize()
    map.flyTo(center, zoom, {
      duration: 2,
      easeLinearity: 0.25,
      animate: true
    })
  }, [center, zoom, map])

  return null
}

interface MapPin {
  lat: number
  lng: number
  label: string
  pin_color?: string
  icon?: string
}

interface ParcelBoundary {
  id: string
  coords: [number, number][]
  type: "subject" | "neighbor"
}

export default function MapBackground({ viewId }: { viewId: string }) {
  const pageData = useMemo(() => PAGES.find(p => p.id === viewId) || PAGES[0], [viewId])
  const { center_lat, center_lng, zoom } = pageData.map_state.camera
  
  const pins = (pageData.map_state.callouts_on_map || pageData.map_state.pins || []) as MapPin[]
  // @ts-ignore
  const parcels = (pageData.map_state.parcel_boundaries || []) as ParcelBoundary[]

  const isHomeView = viewId === 'parcel_detail_home'
  const homeCoords: [number, number] = [34.4505, -119.2865]

  return (
    <div className="h-full w-full bg-[#F3F5F7]">
      <MapContainer
        center={[34.4480, -119.2429]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        {/* Switch to Satellite for Home View, Light for others */}
        {isHomeView ? (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
            maxZoom={18}
          />
        ) : (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            maxZoom={18}
          />
        )}
        
        <MapController center={[center_lat || 34.4480, center_lng || -119.2429]} zoom={zoom || 13} />

        {/* Render Parcel Boundaries */}
        {parcels.map((parcel) => (
          <Polygon 
            key={parcel.id}
            positions={parcel.coords}
            pathOptions={{
              color: parcel.type === 'subject' ? '#2563EB' : 'white',
              weight: parcel.type === 'subject' ? 3 : 1,
              fillColor: parcel.type === 'subject' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              fillOpacity: 0.2,
              dashArray: parcel.type === 'neighbor' ? '5, 5' : undefined
            }}
          />
        ))}

        {/* Home Marker */}
        {(viewId === 'parcel_detail_home' || viewId === 'neighborhood_plan_dominion') && (
          <Marker 
            position={homeCoords}
            icon={createPinIcon("#FFB020", true)}
            zIndexOffset={1000}
          >
            <Popup className="custom-popup">
              <div className="text-sm font-bold text-center">1071 Dominion Rd</div>
            </Popup>
          </Marker>
        )}

        {/* Callout Pins - Show on Home and Area/Neighborhood levels */}
        {pins.map((pin: MapPin, i: number) => (
          pin.lat && pin.lng && (
            <Marker 
              key={`${viewId}-pin-${i}`} 
              position={[pin.lat, pin.lng]}
              icon={createPinIcon(pin.pin_color || "#5DA9FF")}
            >
              <Popup className="custom-popup">
                <div className="text-sm font-semibold">{pin.label}</div>
              </Popup>
            </Marker>
          )
        ))}

      </MapContainer>
    </div>
  )
}
