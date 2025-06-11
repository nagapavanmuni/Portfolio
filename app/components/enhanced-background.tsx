"use client"

import { useEffect, useState, useCallback, useRef } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  baseY: number
  size: number
  opacity: number
  hue: number
  speed: number
  phase: number
  type: "orb" | "bubble" | "glow" | "geometric"
}

interface WaveRipple {
  id: number
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  speed: number
  color: string
}

export default function EnhancedBackground() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const elementsRef = useRef<FloatingElement[]>([])
  const ripplesRef = useRef<WaveRipple[]>([])
  const lastScrollY = useRef(0)
  const isInitialized = useRef(false)

  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      const newDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      setDimensions(newDimensions)

      if (canvasRef.current) {
        canvasRef.current.width = newDimensions.width
        canvasRef.current.height = newDimensions.height
      }
    }
  }, [])

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? Math.min(currentScrollY / maxScroll, 1) : 0

    setScrollY(currentScrollY)
    setScrollProgress(progress)

    // Create gentle ripples on scroll
    if (Math.abs(currentScrollY - lastScrollY.current) > 50 && dimensions.width > 0) {
      const newRipple: WaveRipple = {
        id: Date.now() + Math.random(),
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        radius: 0,
        maxRadius: 120 + Math.random() * 80,
        opacity: 0.2,
        speed: 1.2 + Math.random() * 0.8,
        color: `hsl(${180 + Math.random() * 80}, 60%, 80%)`,
      }

      ripplesRef.current = [...ripplesRef.current.slice(-2), newRipple]
    }

    lastScrollY.current = currentScrollY
  }, [dimensions.width, dimensions.height])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  // Initialize elements only once
  useEffect(() => {
    if (typeof window === "undefined" || isInitialized.current) return

    const newDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    setDimensions(newDimensions)

    // Initialize floating elements with more variety
    elementsRef.current = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * newDimensions.width,
      y: Math.random() * newDimensions.height,
      baseY: Math.random() * newDimensions.height,
      size: Math.random() * 80 + 40,
      opacity: 0.015 + Math.random() * 0.025,
      hue: 180 + Math.random() * 100,
      speed: 0.08 + Math.random() * 0.15,
      phase: Math.random() * Math.PI * 2,
      type: ["orb", "bubble", "glow", "geometric"][Math.floor(Math.random() * 4)] as any,
    }))

    if (canvasRef.current) {
      canvasRef.current.width = newDimensions.width
      canvasRef.current.height = newDimensions.height
    }

    isInitialized.current = true
  }, [])

  // Event listeners
  useEffect(() => {
    if (!isInitialized.current) return

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [handleScroll, handleMouseMove, handleResize])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || !isInitialized.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      // Clear canvas with dynamic gradient
      const hueShift = scrollProgress * 40 + 200

      const gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height)
      gradient.addColorStop(0, `hsla(${hueShift}, 35%, 98%, 0.95)`)
      gradient.addColorStop(0.3, `hsla(${hueShift + 15}, 30%, 96%, 0.98)`)
      gradient.addColorStop(0.7, `hsla(${hueShift + 30}, 25%, 94%, 0.98)`)
      gradient.addColorStop(1, `hsla(${hueShift + 45}, 20%, 92%, 0.95)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw floating elements
      elementsRef.current = elementsRef.current.map((element) => {
        const phase = element.phase + 0.006
        const parallaxY = element.baseY + scrollY * element.speed
        const wrappedY = (parallaxY % (dimensions.height + element.size * 2)) - element.size

        // Gentle floating motion
        const floatX = element.x + Math.sin(phase) * 0.8
        const floatY = wrappedY + Math.cos(phase * 0.6) * 0.5

        // Mouse interaction
        const mouseDistance = Math.sqrt(Math.pow(mousePosition.x - floatX, 2) + Math.pow(mousePosition.y - floatY, 2))
        const mouseInfluence = Math.max(0, Math.min(1, 1 - mouseDistance / 200))
        const currentOpacity = element.opacity + mouseInfluence * 0.015

        // Breathing effect
        const breathingScale = 0.85 + Math.sin(phase * 1.2) * 0.15
        const currentSize = element.size * breathingScale

        // Draw element based on type
        try {
          switch (element.type) {
            case "orb":
              const orbGradient = ctx.createRadialGradient(floatX, floatY, 0, floatX, floatY, currentSize)
              orbGradient.addColorStop(0, `hsla(${element.hue}, 55%, 85%, ${currentOpacity})`)
              orbGradient.addColorStop(0.5, `hsla(${element.hue}, 45%, 75%, ${currentOpacity * 0.6})`)
              orbGradient.addColorStop(1, `hsla(${element.hue}, 35%, 65%, 0)`)
              ctx.fillStyle = orbGradient
              ctx.beginPath()
              ctx.arc(floatX, floatY, currentSize, 0, Math.PI * 2)
              ctx.fill()
              break

            case "bubble":
              const bubbleGradient = ctx.createRadialGradient(
                floatX - currentSize * 0.3,
                floatY - currentSize * 0.3,
                0,
                floatX,
                floatY,
                currentSize,
              )
              bubbleGradient.addColorStop(0, `hsla(${element.hue}, 65%, 90%, ${currentOpacity * 0.7})`)
              bubbleGradient.addColorStop(0.7, `hsla(${element.hue}, 55%, 80%, ${currentOpacity * 0.3})`)
              bubbleGradient.addColorStop(1, `hsla(${element.hue}, 45%, 70%, 0)`)
              ctx.fillStyle = bubbleGradient
              ctx.beginPath()
              ctx.arc(floatX, floatY, currentSize * 0.7, 0, Math.PI * 2)
              ctx.fill()
              break

            case "glow":
              const glowGradient = ctx.createRadialGradient(floatX, floatY, 0, floatX, floatY, currentSize * 1.8)
              glowGradient.addColorStop(0, `hsla(${element.hue}, 75%, 95%, ${currentOpacity * 0.5})`)
              glowGradient.addColorStop(0.4, `hsla(${element.hue}, 65%, 85%, ${currentOpacity * 0.25})`)
              glowGradient.addColorStop(1, `hsla(${element.hue}, 55%, 75%, 0)`)
              ctx.fillStyle = glowGradient
              ctx.beginPath()
              ctx.arc(floatX, floatY, currentSize * 1.4, 0, Math.PI * 2)
              ctx.fill()
              break

            case "geometric":
              const geomGradient = ctx.createLinearGradient(
                floatX - currentSize,
                floatY - currentSize,
                floatX + currentSize,
                floatY + currentSize,
              )
              geomGradient.addColorStop(0, `hsla(${element.hue}, 60%, 88%, ${currentOpacity * 0.6})`)
              geomGradient.addColorStop(0.5, `hsla(${element.hue + 20}, 50%, 78%, ${currentOpacity * 0.4})`)
              geomGradient.addColorStop(1, `hsla(${element.hue + 40}, 40%, 68%, 0)`)
              ctx.fillStyle = geomGradient
              ctx.save()
              ctx.translate(floatX, floatY)
              ctx.rotate(phase * 0.5)
              ctx.fillRect(-currentSize * 0.3, -currentSize * 0.3, currentSize * 0.6, currentSize * 0.6)
              ctx.restore()
              break
          }
        } catch (error) {
          // Silently handle any drawing errors
        }

        return {
          ...element,
          x: floatX,
          y: floatY,
          phase,
        }
      })

      // Update and draw ripples
      ripplesRef.current = ripplesRef.current
        .map((ripple) => {
          const newRadius = ripple.radius + ripple.speed
          const newOpacity = ripple.opacity * (1 - newRadius / ripple.maxRadius)

          if (newRadius < ripple.maxRadius && newOpacity > 0.005) {
            try {
              // Draw ripple with enhanced styling
              ctx.strokeStyle = `hsla(${200 + scrollProgress * 40}, 55%, 75%, ${newOpacity})`
              ctx.lineWidth = 2
              ctx.setLineDash([5, 5])
              ctx.beginPath()
              ctx.arc(ripple.x, ripple.y, newRadius, 0, Math.PI * 2)
              ctx.stroke()
              ctx.setLineDash([])
            } catch (error) {
              // Silently handle any drawing errors
            }

            return { ...ripple, radius: newRadius, opacity: newOpacity }
          }
          return null
        })
        .filter(Boolean) as WaveRipple[]

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions.width, dimensions.height, scrollY, scrollProgress, mousePosition.x, mousePosition.y])

  if (typeof window === "undefined") {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "multiply" }} />

      {/* Enhanced gradient overlays with community-inspired patterns */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, hsla(${200 + scrollProgress * 30}, 40%, 95%, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, hsla(${220 + scrollProgress * 30}, 35%, 97%, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, hsla(${240 + scrollProgress * 30}, 30%, 99%, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, 
              hsla(${180 + scrollProgress * 25}, 25%, 98%, 0.4) 0%, 
              hsla(${200 + scrollProgress * 25}, 20%, 96%, 0.3) 50%, 
              hsla(${220 + scrollProgress * 25}, 15%, 94%, 0.4) 100%)
          `,
        }}
      />

      {/* Geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #14b8a6 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px, 40px 40px",
          backgroundPosition: "0 0, 30px 30px",
        }}
      />

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-white/85 dark:bg-gray-900/85" />

      {/* Subtle texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
