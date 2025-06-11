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
  type: "orb" | "bubble" | "glow"
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

export default function SoothingAnimatedBackground() {
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
        maxRadius: 100 + Math.random() * 100,
        opacity: 0.3,
        speed: 1.5 + Math.random(),
        color: `hsl(${200 + Math.random() * 60}, 60%, 80%)`,
      }

      ripplesRef.current = [...ripplesRef.current.slice(-3), newRipple]
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

    // Initialize floating elements
    elementsRef.current = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * newDimensions.width,
      y: Math.random() * newDimensions.height,
      baseY: Math.random() * newDimensions.height,
      size: Math.random() * 60 + 30,
      opacity: 0.02 + Math.random() * 0.03,
      hue: 200 + Math.random() * 80,
      speed: 0.1 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      type: ["orb", "bubble", "glow"][Math.floor(Math.random() * 3)] as any,
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
      // Clear canvas with dynamic gradient based on scroll
      const hueShift = scrollProgress * 60 + 200

      const gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height)
      gradient.addColorStop(0, `hsla(${hueShift}, 40%, 97%, 0.95)`)
      gradient.addColorStop(0.3, `hsla(${hueShift + 20}, 35%, 95%, 0.98)`)
      gradient.addColorStop(0.7, `hsla(${hueShift + 40}, 30%, 93%, 0.98)`)
      gradient.addColorStop(1, `hsla(${hueShift + 60}, 25%, 91%, 0.95)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw floating elements
      elementsRef.current = elementsRef.current.map((element) => {
        const phase = element.phase + 0.008
        const parallaxY = element.baseY + scrollY * element.speed
        const wrappedY = (parallaxY % (dimensions.height + element.size * 2)) - element.size

        // Gentle floating motion
        const floatX = element.x + Math.sin(phase) * 0.5
        const floatY = wrappedY + Math.cos(phase * 0.7) * 0.3

        // Mouse interaction
        const mouseDistance = Math.sqrt(Math.pow(mousePosition.x - floatX, 2) + Math.pow(mousePosition.y - floatY, 2))
        const mouseInfluence = Math.max(0, Math.min(1, 1 - mouseDistance / 150))
        const currentOpacity = element.opacity + mouseInfluence * 0.02

        // Breathing effect
        const breathingScale = 0.9 + Math.sin(phase * 1.5) * 0.1
        const currentSize = element.size * breathingScale

        // Draw element based on type
        try {
          switch (element.type) {
            case "orb":
              const orbGradient = ctx.createRadialGradient(floatX, floatY, 0, floatX, floatY, currentSize)
              orbGradient.addColorStop(0, `hsla(${element.hue}, 60%, 85%, ${currentOpacity})`)
              orbGradient.addColorStop(0.4, `hsla(${element.hue}, 50%, 75%, ${currentOpacity * 0.6})`)
              orbGradient.addColorStop(1, `hsla(${element.hue}, 40%, 65%, 0)`)
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
              bubbleGradient.addColorStop(0, `hsla(${element.hue}, 70%, 90%, ${currentOpacity * 0.8})`)
              bubbleGradient.addColorStop(0.7, `hsla(${element.hue}, 60%, 80%, ${currentOpacity * 0.4})`)
              bubbleGradient.addColorStop(1, `hsla(${element.hue}, 50%, 70%, 0)`)
              ctx.fillStyle = bubbleGradient
              ctx.beginPath()
              ctx.arc(floatX, floatY, currentSize * 0.8, 0, Math.PI * 2)
              ctx.fill()
              break

            case "glow":
              const glowGradient = ctx.createRadialGradient(floatX, floatY, 0, floatX, floatY, currentSize * 1.5)
              glowGradient.addColorStop(0, `hsla(${element.hue}, 80%, 95%, ${currentOpacity * 0.6})`)
              glowGradient.addColorStop(0.5, `hsla(${element.hue}, 70%, 85%, ${currentOpacity * 0.3})`)
              glowGradient.addColorStop(1, `hsla(${element.hue}, 60%, 75%, 0)`)
              ctx.fillStyle = glowGradient
              ctx.beginPath()
              ctx.arc(floatX, floatY, currentSize * 1.2, 0, Math.PI * 2)
              ctx.fill()
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

          if (newRadius < ripple.maxRadius && newOpacity > 0.01) {
            try {
              // Draw ripple
              ctx.strokeStyle = `hsla(${200 + scrollProgress * 60}, 60%, 80%, ${newOpacity})`
              ctx.lineWidth = 1.5
              ctx.beginPath()
              ctx.arc(ripple.x, ripple.y, newRadius, 0, Math.PI * 2)
              ctx.stroke()
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

      {/* Dynamic gradient overlays */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `linear-gradient(135deg, 
            hsla(${200 + scrollProgress * 40}, 30%, 95%, 0.3) 0%, 
            hsla(${220 + scrollProgress * 40}, 25%, 97%, 0.2) 50%, 
            hsla(${240 + scrollProgress * 40}, 20%, 99%, 0.3) 100%)`,
        }}
      />

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-white/85 dark:bg-gray-900/85" />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
