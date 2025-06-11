"use client"

import type React from "react"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Download, ZoomIn, ZoomOut, RotateCw, Maximize2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  image: { src: string; alt: string; title: string } | null
  onDownload?: () => void
}

export default function ImageLightbox({ isOpen, onClose, image, onDownload }: ImageLightboxProps) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setZoom(1)
      setRotation(0)
      setPosition({ x: 0, y: 0 })
      setIsLoading(true)
      setHasError(false)
    }
  }, [isOpen, image])

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "+":
        case "=":
          e.preventDefault()
          handleZoomIn()
          break
        case "-":
          e.preventDefault()
          handleZoomOut()
          break
        case "r":
        case "R":
          e.preventDefault()
          handleRotate()
          break
        case "0":
          e.preventDefault()
          handleReset()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 5))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.5))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleReset = () => {
    setZoom(1)
    setRotation(0)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setZoom((prev) => Math.max(0.5, Math.min(5, prev * delta)))
  }

  if (!image) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 gap-0 bg-black/95 border-0">
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-white font-medium text-lg">{image.title}</h3>
              <div className="hidden sm:flex items-center gap-2 text-white/70 text-sm">
                <span>Zoom: {Math.round(zoom * 100)}%</span>
                <span>•</span>
                <span>Rotation: {rotation}°</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                className="text-white hover:bg-white/20"
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="text-white hover:bg-white/20"
                disabled={zoom >= 5}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="icon" onClick={handleRotate} className="text-white hover:bg-white/20">
                <RotateCw className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="icon" onClick={handleReset} className="text-white hover:bg-white/20">
                <Maximize2 className="h-4 w-4" />
              </Button>

              {onDownload && (
                <Button variant="ghost" size="icon" onClick={onDownload} className="text-white hover:bg-white/20">
                  <Download className="h-4 w-4" />
                </Button>
              )}

              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Image Container */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-sm">Loading high-resolution image...</p>
              </div>
            </div>
          )}

          {hasError ? (
            <div className="flex flex-col items-center gap-4 text-white">
              <div className="text-6xl">⚠️</div>
              <p className="text-lg">Failed to load image</p>
              <Button
                variant="outline"
                onClick={onDownload}
                className="text-white border-white hover:bg-white hover:text-black"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF Instead
              </Button>
            </div>
          ) : (
            <div
              ref={imageRef}
              className="relative transition-transform duration-200 ease-out"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                transformOrigin: "center center",
              }}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={1200}
                height={1600}
                className="max-w-none max-h-none object-contain"
                style={{
                  maxWidth: "90vw",
                  maxHeight: "80vh",
                  width: "auto",
                  height: "auto",
                }}
                priority
                quality={100}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false)
                  setHasError(true)
                }}
                draggable={false}
              />
            </div>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div className="text-white/70 text-sm">
              <p>{image.alt}</p>
            </div>

            <div className="flex items-center gap-4 text-white/70 text-xs">
              <span>Use mouse wheel to zoom</span>
              <span>•</span>
              <span>Drag to pan when zoomed</span>
              <span>•</span>
              <span>Press R to rotate</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
