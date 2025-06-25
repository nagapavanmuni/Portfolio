"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useTheme } from "next-themes"

interface AnimatedElement {
  id: number
  x: number
  y: number
  baseY: number
  size: number
  opacity: number
  hue: number
  speed: number
  phase: number
  rotation: number
  rotationSpeed: number
  type: "orb" | "bubble" | "geometric" | "particle" | "wave" | "star"
  pulsePhase: number
  direction: number
}

interface InteractionRipple {
  id: number
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  speed: number
  color: string
  thickness: number
  type: "click" | "scroll" | "hover"
}

interface FloatingParticle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
  life: number
  maxLife: number
  type: "spark" | "dot" | "trail" | "glow"
}

export default function EnhancedThemeBackground() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const { resolvedTheme } = useTheme()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const elementsRef = useRef<AnimatedElement[]>([])
  const ripplesRef = useRef<InteractionRipple[]>([])
  const particlesRef = useRef<FloatingParticle[]>([])
  const lastScrollY = useRef(0)
  const mouseTimeoutRef = useRef<NodeJS.Timeout>()
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const isInitialized = useRef(false)

  // Theme-specific configurations
  const getThemeConfig = () => {
    if (resolvedTheme === "dark") {
      return {
        name: "dark",
        background: {
          primary: "hsla(220, 25%, 8%, 0.95)",
          secondary: "hsla(230, 20%, 12%, 0.98)",
          tertiary: "hsla(240, 15%, 15%, 0.98)",
          quaternary: "hsla(250, 20%, 18%, 0.95)",
        },
        elements: {
          count: 30,
          hueRange: [180, 300],
          saturation: 70,
          lightness: 65,
          opacity: { min: 0.03, max: 0.08 },
          size: { min: 30, max: 80 },
          speed: { min: 0.05, max: 0.2 },
        },
        particles: {
          hueRange: [160, 280],
          saturation: 80,
          lightness: 75,
          opacity: 0.6,
        },
        overlays: {
          primary: "hsla(200, 30%, 15%, 0.4)",
          secondary: "hsla(220, 25%, 20%, 0.35)",
          tertiary: "hsla(240, 20%, 25%, 0.3)",
          mesh: "hsla(210, 40%, 60%, 0.02)",
        },
        readability: "bg-gray-900/82",
        animations: {
          type: "cosmic",
          intensity: "medium",
          patterns: ["nebula", "stars", "aurora"],
        },
      }
    }

    return {
      name: "light",
      background: {
        primary: "hsla(200, 40%, 98%, 0.95)",
        secondary: "hsla(220, 35%, 96%, 0.98)",
        tertiary: "hsla(240, 30%, 94%, 0.98)",
        quaternary: "hsla(260, 35%, 96%, 0.95)",
      },
      elements: {
        count: 25,
        hueRange: [160, 260],
        saturation: 60,
        lightness: 80,
        opacity: { min: 0.02, max: 0.05 },
        size: { min: 40, max: 100 },
        speed: { min: 0.03, max: 0.15 },
      },
      particles: {
        hueRange: [180, 280],
        saturation: 70,
        lightness: 60,
        opacity: 0.4,
      },
      overlays: {
        primary: "hsla(180, 50%, 95%, 0.4)",
        secondary: "hsla(200, 45%, 97%, 0.35)",
        tertiary: "hsla(220, 40%, 99%, 0.3)",
        mesh: "hsla(210, 60%, 40%, 0.04)",
      },
      readability: "bg-white/82",
      animations: {
        type: "organic",
        intensity: "gentle",
        patterns: ["waves", "bubbles", "flow"],
      },
    }
  }

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
    setIsScrolling(true)

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Create scroll particles
    if (Math.abs(currentScrollY - lastScrollY.current) > 40 && dimensions.width > 0) {
      const config = getThemeConfig()
      const scrollDirection = currentScrollY > lastScrollY.current ? 1 : -1
      const particleCount = Math.min(Math.floor(Math.abs(currentScrollY - lastScrollY.current) / 60), 4)

      const newParticles: FloatingParticle[] = Array.from({ length: particleCount }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * dimensions.width,
        y: scrollDirection > 0 ? -10 : dimensions.height + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: scrollDirection * (Math.random() * 1.5 + 0.5),
        size: Math.random() * 4 + 2,
        opacity: config.particles.opacity,
        hue:
          config.particles.hueRange[0] + Math.random() * (config.particles.hueRange[1] - config.particles.hueRange[0]),
        life: 0,
        maxLife: 100 + Math.random() * 50,
        type: ["spark", "dot", "trail", "glow"][Math.floor(Math.random() * 4)] as any,
      }))

      particlesRef.current = [...particlesRef.current, ...newParticles]

      // Create scroll ripple
      const newRipple: InteractionRipple = {
        id: Date.now(),
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        radius: 0,
        maxRadius: 80 + Math.random() * 60,
        opacity: resolvedTheme === "dark" ? 0.3 : 0.2,
        speed: 1.5 + Math.random() * 1,
        color: `hsl(${config.particles.hueRange[0] + Math.random() * (config.particles.hueRange[1] - config.particles.hueRange[0])}, 60%, 70%)`,
        thickness: 1.5,
        type: "scroll",
      }

      ripplesRef.current = [...ripplesRef.current.slice(-3), newRipple]
    }

    // Set scrolling to false after delay
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 200)

    lastScrollY.current = currentScrollY
  }, [dimensions.width, dimensions.height, resolvedTheme])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
    setIsMouseMoving(true)

    if (mouseTimeoutRef.current) {
      clearTimeout(mouseTimeoutRef.current)
    }

    mouseTimeoutRef.current = setTimeout(() => {
      setIsMouseMoving(false)
    }, 150)
  }, [])

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const config = getThemeConfig()

      // Create click ripple
      const newRipple: InteractionRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 120 + Math.random() * 80,
        opacity: resolvedTheme === "dark" ? 0.5 : 0.4,
        speed: 2.5 + Math.random() * 1.5,
        color: `hsl(${config.particles.hueRange[0] + Math.random() * (config.particles.hueRange[1] - config.particles.hueRange[0])}, 70%, 65%)`,
        thickness: 2,
        type: "click",
      }

      ripplesRef.current = [...ripplesRef.current.slice(-4), newRipple]

      // Create burst particles
      const burstParticles: FloatingParticle[] = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i + 1000,
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos((i / 8) * Math.PI * 2) * (Math.random() * 3 + 1),
        vy: Math.sin((i / 8) * Math.PI * 2) * (Math.random() * 3 + 1),
        size: Math.random() * 3 + 1,
        opacity: config.particles.opacity * 1.5,
        hue:
          config.particles.hueRange[0] + Math.random() * (config.particles.hueRange[1] - config.particles.hueRange[0]),
        life: 0,
        maxLife: 60 + Math.random() * 40,
        type: ["spark", "glow"][Math.floor(Math.random() * 2)] as any,
      }))

      particlesRef.current = [...particlesRef.current, ...burstParticles]
    },
    [resolvedTheme],
  )

  // Initialize elements
  useEffect(() => {
    if (typeof window === "undefined" || isInitialized.current) return

    const newDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    setDimensions(newDimensions)

    const config = getThemeConfig()

    // Initialize animated elements
    elementsRef.current = Array.from({ length: config.elements.count }, (_, i) => ({
      id: i,
      x: Math.random() * newDimensions.width,
      y: Math.random() * newDimensions.height,
      baseY: Math.random() * newDimensions.height,
      size: config.elements.size.min + Math.random() * (config.elements.size.max - config.elements.size.min),
      opacity:
        config.elements.opacity.min + Math.random() * (config.elements.opacity.max - config.elements.opacity.min),
      hue: config.elements.hueRange[0] + Math.random() * (config.elements.hueRange[1] - config.elements.hueRange[0]),
      speed: config.elements.speed.min + Math.random() * (config.elements.speed.max - config.elements.speed.min),
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      type: ["orb", "bubble", "geometric", "particle", "wave", "star"][Math.floor(Math.random() * 6)] as any,
      pulsePhase: Math.random() * Math.PI * 2,
      direction: Math.random() > 0.5 ? 1 : -1,
    }))

    if (canvasRef.current) {
      canvasRef.current.width = newDimensions.width
      canvasRef.current.height = newDimensions.height
    }

    isInitialized.current = true
  }, [resolvedTheme])

  // Event listeners
  useEffect(() => {
    if (!isInitialized.current) return

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("click", handleClick, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("resize", handleResize)
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll, handleMouseMove, handleClick, handleResize])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || !isInitialized.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      const time = Date.now() * 0.001
      const config = getThemeConfig()

      // Clear with dynamic gradient
      const gradient = ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height)

      if (resolvedTheme === "dark") {
        // Dark mode: Cosmic/nebula-like gradient
        const hueShift = (scrollProgress * 40 + time * 5) % 360
        gradient.addColorStop(0, `hsla(${220 + hueShift}, 25%, 8%, 0.95)`)
        gradient.addColorStop(0.3, `hsla(${230 + hueShift}, 20%, 12%, 0.98)`)
        gradient.addColorStop(0.6, `hsla(${240 + hueShift}, 15%, 15%, 0.98)`)
        gradient.addColorStop(1, `hsla(${250 + hueShift}, 20%, 18%, 0.95)`)
      } else {
        // Light mode: Organic/flowing gradient
        const hueShift = (scrollProgress * 30 + time * 8) % 360
        gradient.addColorStop(0, `hsla(${200 + hueShift}, 40%, 98%, 0.95)`)
        gradient.addColorStop(0.25, `hsla(${220 + hueShift}, 35%, 96%, 0.98)`)
        gradient.addColorStop(0.75, `hsla(${240 + hueShift}, 30%, 94%, 0.98)`)
        gradient.addColorStop(1, `hsla(${260 + hueShift}, 35%, 96%, 0.95)`)
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw animated elements
      elementsRef.current = elementsRef.current.map((element) => {
        const phase = element.phase + (resolvedTheme === "dark" ? 0.006 : 0.008)
        const pulsePhase = element.pulsePhase + 0.02
        const parallaxY = element.baseY + scrollY * element.speed
        const wrappedY = (parallaxY % (dimensions.height + element.size * 2)) - element.size

        // Different movement patterns for light/dark modes
        let floatX, floatY
        if (resolvedTheme === "dark") {
          // Dark mode: More cosmic, orbital movements
          floatX = element.x + Math.sin(phase) * 2 + Math.cos(phase * 0.5) * 1
          floatY = wrappedY + Math.cos(phase * 0.8) * 1.5 + Math.sin(phase * 1.2) * 0.5
        } else {
          // Light mode: More organic, flowing movements
          floatX = element.x + Math.sin(phase) * 1.5 + Math.sin(phase * 1.5) * 0.5
          floatY = wrappedY + Math.cos(phase * 0.6) * 1 + Math.sin(phase * 0.9) * 0.8
        }

        const rotation = element.rotation + element.rotationSpeed

        // Mouse interaction
        const mouseDistance = Math.sqrt(Math.pow(mousePosition.x - floatX, 2) + Math.pow(mousePosition.y - floatY, 2))
        const mouseInfluence = Math.max(0, Math.min(1, 1 - mouseDistance / 250))
        const currentOpacity = element.opacity + (isMouseMoving ? mouseInfluence * 0.04 : 0) + (isScrolling ? 0.02 : 0)

        // Breathing/pulsing effect
        const breathingScale = 0.7 + Math.sin(pulsePhase) * 0.3
        const currentSize = element.size * breathingScale

        // Draw element based on type and theme
        ctx.save()
        ctx.translate(floatX, floatY)
        ctx.rotate(rotation)
        ctx.globalAlpha = currentOpacity

        const elementGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize)

        if (resolvedTheme === "dark") {
          // Dark mode: More vibrant, glowing elements
          elementGradient.addColorStop(
            0,
            `hsl(${element.hue}, ${config.elements.saturation}%, ${config.elements.lightness + 10}%)`,
          )
          elementGradient.addColorStop(
            0.5,
            `hsl(${element.hue}, ${config.elements.saturation - 10}%, ${config.elements.lightness}%)`,
          )
          elementGradient.addColorStop(
            1,
            `hsl(${element.hue}, ${config.elements.saturation - 30}%, ${config.elements.lightness - 20}%)`,
          )
        } else {
          // Light mode: Softer, more subtle elements
          elementGradient.addColorStop(
            0,
            `hsl(${element.hue}, ${config.elements.saturation}%, ${config.elements.lightness}%)`,
          )
          elementGradient.addColorStop(
            0.6,
            `hsl(${element.hue}, ${config.elements.saturation - 15}%, ${config.elements.lightness - 10}%)`,
          )
          elementGradient.addColorStop(
            1,
            `hsl(${element.hue}, ${config.elements.saturation - 25}%, ${config.elements.lightness - 20}%)`,
          )
        }

        ctx.fillStyle = elementGradient

        // Different shapes for different themes
        switch (element.type) {
          case "orb":
            ctx.beginPath()
            ctx.arc(0, 0, currentSize * 0.5, 0, Math.PI * 2)
            ctx.fill()
            if (resolvedTheme === "dark") {
              ctx.strokeStyle = `hsl(${element.hue}, 80%, 80%)`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
            break

          case "bubble":
            const bubbleSize = currentSize * (resolvedTheme === "dark" ? 0.6 : 0.7)
            ctx.beginPath()
            ctx.arc(0, 0, bubbleSize, 0, Math.PI * 2)
            ctx.fill()
            // Add highlight for bubble effect
            const highlight = ctx.createRadialGradient(-bubbleSize * 0.3, -bubbleSize * 0.3, 0, 0, 0, bubbleSize)
            highlight.addColorStop(0, `hsla(${element.hue}, 70%, 90%, 0.6)`)
            highlight.addColorStop(1, "transparent")
            ctx.fillStyle = highlight
            ctx.fill()
            break

          case "geometric":
            if (resolvedTheme === "dark") {
              // Star shape for dark mode
              ctx.beginPath()
              for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2
                const outerRadius = currentSize * 0.4
                const innerRadius = currentSize * 0.2
                const x = Math.cos(angle) * (i % 2 === 0 ? outerRadius : innerRadius)
                const y = Math.sin(angle) * (i % 2 === 0 ? outerRadius : innerRadius)
                if (i === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
              }
              ctx.closePath()
              ctx.fill()
            } else {
              // Hexagon for light mode
              ctx.beginPath()
              for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2
                const x = Math.cos(angle) * currentSize * 0.4
                const y = Math.sin(angle) * currentSize * 0.4
                if (i === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
              }
              ctx.closePath()
              ctx.fill()
            }
            break

          case "particle":
            const particleSize = currentSize * 0.3
            ctx.beginPath()
            ctx.arc(0, 0, particleSize, 0, Math.PI * 2)
            ctx.fill()
            break

          case "wave":
            ctx.beginPath()
            ctx.strokeStyle = elementGradient
            ctx.lineWidth = 2
            ctx.moveTo(-currentSize * 0.5, 0)
            for (let i = 0; i <= 10; i++) {
              const x = -currentSize * 0.5 + (i / 10) * currentSize
              const y = Math.sin((i / 10) * Math.PI * 2 + phase * 2) * currentSize * 0.2
              ctx.lineTo(x, y)
            }
            ctx.stroke()
            break

          case "star":
            ctx.beginPath()
            for (let i = 0; i < 5; i++) {
              const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
              const outerRadius = currentSize * 0.4
              const innerRadius = currentSize * 0.2
              const outerX = Math.cos(angle) * outerRadius
              const outerY = Math.sin(angle) * outerRadius
              const innerAngle = angle + Math.PI / 5
              const innerX = Math.cos(innerAngle) * innerRadius
              const innerY = Math.sin(innerAngle) * innerRadius

              if (i === 0) ctx.moveTo(outerX, outerY)
              else ctx.lineTo(outerX, outerY)
              ctx.lineTo(innerX, innerY)
            }
            ctx.closePath()
            ctx.fill()
            break
        }

        ctx.restore()

        return {
          ...element,
          x: floatX,
          y: floatY,
          phase,
          pulsePhase,
          rotation,
        }
      })

      // Update and draw floating particles
      particlesRef.current = particlesRef.current
        .filter((particle) => {
          const newLife = particle.life + 1
          const lifeRatio = newLife / particle.maxLife

          if (newLife < particle.maxLife) {
            const newX = particle.x + particle.vx
            const newY = particle.y + particle.vy
            const newOpacity = particle.opacity * (1 - lifeRatio)
            const newSize = particle.size * (1 - lifeRatio * 0.2)

            ctx.save()
            ctx.globalAlpha = newOpacity
            ctx.translate(newX, newY)

            const particleGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, newSize * 2)
            particleGradient.addColorStop(
              0,
              `hsl(${particle.hue}, ${config.particles.saturation}%, ${config.particles.lightness}%)`,
            )
            particleGradient.addColorStop(
              0.5,
              `hsl(${particle.hue}, ${config.particles.saturation - 10}%, ${config.particles.lightness - 10}%)`,
            )
            particleGradient.addColorStop(
              1,
              `hsl(${particle.hue}, ${config.particles.saturation - 20}%, ${config.particles.lightness - 20}%)`,
            )

            ctx.fillStyle = particleGradient

            switch (particle.type) {
              case "spark":
                ctx.beginPath()
                ctx.moveTo(-newSize, 0)
                ctx.lineTo(0, -newSize * 0.3)
                ctx.lineTo(newSize, 0)
                ctx.lineTo(0, newSize * 0.3)
                ctx.closePath()
                ctx.fill()
                break
              case "dot":
                ctx.beginPath()
                ctx.arc(0, 0, newSize, 0, Math.PI * 2)
                ctx.fill()
                break
              case "trail":
                ctx.beginPath()
                ctx.ellipse(0, 0, newSize * 1.5, newSize * 0.5, 0, 0, Math.PI * 2)
                ctx.fill()
                break
              case "glow":
                ctx.beginPath()
                ctx.arc(0, 0, newSize * 1.5, 0, Math.PI * 2)
                ctx.fill()
                break
            }

            ctx.restore()

            return {
              ...particle,
              x: newX,
              y: newY,
              life: newLife,
              opacity: newOpacity,
              size: newSize,
              vx: particle.vx * 0.99,
              vy: particle.vy * 0.99,
            }
          }
          return null
        })
        .filter(Boolean) as FloatingParticle[]

      // Update and draw interaction ripples
      ripplesRef.current = ripplesRef.current
        .filter((ripple) => {
          const newRadius = ripple.radius + ripple.speed
          const newOpacity = ripple.opacity * (1 - newRadius / ripple.maxRadius)

          if (newRadius < ripple.maxRadius && newOpacity > 0.01) {
            ctx.strokeStyle = `hsla(${180 + scrollProgress * 40}, 60%, ${resolvedTheme === "dark" ? 70 : 50}%, ${newOpacity})`
            ctx.lineWidth = ripple.thickness

            if (ripple.type === "click") {
              // Solid circle for clicks
              ctx.beginPath()
              ctx.arc(ripple.x, ripple.y, newRadius, 0, Math.PI * 2)
              ctx.stroke()
            } else {
              // Dashed circle for scroll/hover
              ctx.setLineDash([5, 5])
              ctx.beginPath()
              ctx.arc(ripple.x, ripple.y, newRadius, 0, Math.PI * 2)
              ctx.stroke()
              ctx.setLineDash([])
            }

            return { ...ripple, radius: newRadius, opacity: newOpacity }
          }
          return null
        })
        .filter(Boolean) as InteractionRipple[]

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, scrollY, scrollProgress, mousePosition, isMouseMoving, isScrolling, resolvedTheme])

  if (typeof window === "undefined") {
    return null
  }

  const config = getThemeConfig()

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "multiply" }} />

      {/* Theme-specific overlay patterns */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background:
            resolvedTheme === "dark"
              ? `
              radial-gradient(circle at 20% 80%, ${config.overlays.primary} 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${config.overlays.secondary} 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, ${config.overlays.tertiary} 0%, transparent 70%),
              conic-gradient(from 0deg at 50% 50%, 
                hsla(220, 30%, 15%, 0.3) 0deg,
                hsla(240, 25%, 20%, 0.2) 120deg,
                hsla(260, 20%, 25%, 0.3) 240deg,
                hsla(220, 30%, 15%, 0.3) 360deg)
            `
              : `
              radial-gradient(circle at 15% 85%, ${config.overlays.primary} 0%, transparent 60%),
              radial-gradient(circle at 85% 15%, ${config.overlays.secondary} 0%, transparent 60%),
              radial-gradient(circle at 50% 50%, ${config.overlays.tertiary} 0%, transparent 70%),
              linear-gradient(135deg, 
                ${config.overlays.primary} 0%, 
                ${config.overlays.secondary} 25%,
                ${config.overlays.tertiary} 50%,
                ${config.overlays.secondary} 75%,
                ${config.overlays.primary} 100%)
            `,
        }}
      />

      {/* Animated mesh pattern */}
      <div
        className={`absolute inset-0 mix-blend-overlay transition-opacity duration-1000`}
        style={{
          opacity: resolvedTheme === "dark" ? 0.015 : 0.03,
          backgroundImage:
            resolvedTheme === "dark"
              ? `
              linear-gradient(45deg, #14b8a6 1px, transparent 1px),
              linear-gradient(-45deg, #3b82f6 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, #8b5cf6 1px, transparent 1px)
            `
              : `
              linear-gradient(30deg, #0d9488 1px, transparent 1px),
              linear-gradient(-30deg, #2563eb 1px, transparent 1px),
              linear-gradient(60deg, #7c3aed 1px, transparent 1px)
            `,
          backgroundSize:
            resolvedTheme === "dark" ? "40px 40px, 40px 40px, 80px 80px" : "35px 35px, 35px 35px, 70px 70px",
          backgroundPosition: "0 0, 20px 20px, 0 0",
          animation: `mesh-move ${resolvedTheme === "dark" ? "25s" : "20s"} linear infinite`,
        }}
      />

      {/* Theme-specific decorative elements */}
      {resolvedTheme === "dark" && (
        <div
          className="absolute inset-0 opacity-[0.008] mix-blend-screen"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, #ffffff 2px, transparent 2px),
              radial-gradient(circle at 80% 80%, #ffffff 1px, transparent 1px),
              radial-gradient(circle at 40% 60%, #ffffff 1.5px, transparent 1.5px)
            `,
            backgroundSize: "200px 200px, 150px 150px, 300px 300px",
            animation: "sparkle 8s ease-in-out infinite",
          }}
        />
      )}

      {resolvedTheme === "light" && (
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 30% 70%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
            `,
            animation: "float 12s ease-in-out infinite",
          }}
        />
      )}

      {/* Readability overlay */}
      <div className={`absolute inset-0 ${config.readability} transition-all duration-1000`} />

      {/* Subtle noise texture for depth */}
      <div
        className={`absolute inset-0 mix-blend-overlay transition-opacity duration-1000`}
        style={{
          opacity: resolvedTheme === "dark" ? 0.008 : 0.012,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${resolvedTheme === "dark" ? "0.6" : "0.8"}' numOctaves='${resolvedTheme === "dark" ? "4" : "3"}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
