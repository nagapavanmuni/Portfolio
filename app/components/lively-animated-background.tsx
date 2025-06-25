"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
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
  type: "spark" | "bubble" | "star" | "dot"
}

interface FloatingShape {
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
  type: "circle" | "triangle" | "square" | "hexagon"
}

interface WaveEffect {
  id: number
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  speed: number
  color: string
  thickness: number
}

export default function LivelyAnimatedBackground() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const { resolvedTheme } = useTheme()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const shapesRef = useRef<FloatingShape[]>([])
  const wavesRef = useRef<WaveEffect[]>([])
  const lastScrollY = useRef(0)
  const mouseTimeoutRef = useRef<NodeJS.Timeout>()
  const isInitialized = useRef(false)

  // Theme-aware color schemes
  const getThemeColors = () => {
    if (resolvedTheme === "dark") {
      return {
        background: {
          start: "hsla(220, 30%, 8%, 0.95)",
          mid1: "hsla(230, 25%, 12%, 0.98)",
          mid2: "hsla(240, 20%, 15%, 0.98)",
          end: "hsla(250, 25%, 18%, 0.95)",
        },
        shapes: {
          hueRange: [180, 280],
          saturation: 70,
          lightness: 60,
        },
        particles: {
          hueRange: [160, 260],
          saturation: 80,
          lightness: 70,
        },
        overlays: {
          primary: "hsla(200, 40%, 15%, 0.4)",
          secondary: "hsla(220, 35%, 20%, 0.35)",
          tertiary: "hsla(240, 30%, 25%, 0.3)",
        },
        readability: "bg-gray-900/85",
      }
    }

    return {
      background: {
        start: "hsla(200, 40%, 98%, 0.95)",
        mid1: "hsla(220, 35%, 96%, 0.98)",
        mid2: "hsla(240, 30%, 94%, 0.98)",
        end: "hsla(260, 35%, 96%, 0.95)",
      },
      shapes: {
        hueRange: [160, 260],
        saturation: 60,
        lightness: 80,
      },
      particles: {
        hueRange: [180, 280],
        saturation: 70,
        lightness: 60,
      },
      overlays: {
        primary: "hsla(180, 50%, 95%, 0.4)",
        secondary: "hsla(200, 45%, 97%, 0.35)",
        tertiary: "hsla(220, 40%, 99%, 0.3)",
      },
      readability: "bg-white/85",
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

    // Create particles on scroll
    if (Math.abs(currentScrollY - lastScrollY.current) > 30 && dimensions.width > 0) {
      const scrollDirection = currentScrollY > lastScrollY.current ? 1 : -1
      const particleCount = Math.min(Math.floor(Math.abs(currentScrollY - lastScrollY.current) / 50), 5)
      const colors = getThemeColors()

      const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * dimensions.width,
        y: scrollDirection > 0 ? -10 : dimensions.height + 10,
        vx: (Math.random() - 0.5) * 3,
        vy: scrollDirection * (Math.random() * 2 + 1),
        size: Math.random() * 5 + 2,
        opacity: 0.8,
        hue:
          colors.particles.hueRange[0] + Math.random() * (colors.particles.hueRange[1] - colors.particles.hueRange[0]),
        life: 0,
        maxLife: 80 + Math.random() * 40,
        type: ["spark", "bubble", "star", "dot"][Math.floor(Math.random() * 4)] as any,
      }))

      particlesRef.current = [...particlesRef.current, ...newParticles]
    }

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
      const colors = getThemeColors()

      // Create wave effect on click
      const newWave: WaveEffect = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 150 + Math.random() * 100,
        opacity: resolvedTheme === "dark" ? 0.4 : 0.6,
        speed: 3 + Math.random() * 2,
        color: `hsl(${colors.particles.hueRange[0] + Math.random() * (colors.particles.hueRange[1] - colors.particles.hueRange[0])}, 70%, 60%)`,
        thickness: 2 + Math.random() * 2,
      }

      wavesRef.current = [...wavesRef.current.slice(-4), newWave]

      // Create burst particles
      const burstParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i + 1000,
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos((i / 12) * Math.PI * 2) * (Math.random() * 4 + 2),
        vy: Math.sin((i / 12) * Math.PI * 2) * (Math.random() * 4 + 2),
        size: Math.random() * 4 + 1,
        opacity: 0.9,
        hue:
          colors.particles.hueRange[0] + Math.random() * (colors.particles.hueRange[1] - colors.particles.hueRange[0]),
        life: 0,
        maxLife: 60 + Math.random() * 30,
        type: ["spark", "star"][Math.floor(Math.random() * 2)] as any,
      }))

      particlesRef.current = [...particlesRef.current, ...burstParticles]
    },
    [resolvedTheme],
  )

  // Initialize
  useEffect(() => {
    if (typeof window === "undefined" || isInitialized.current) return

    const newDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    setDimensions(newDimensions)

    // Initialize floating shapes
    const colors = getThemeColors()
    shapesRef.current = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * newDimensions.width,
      y: Math.random() * newDimensions.height,
      baseY: Math.random() * newDimensions.height,
      size: Math.random() * 60 + 20,
      opacity: resolvedTheme === "dark" ? 0.03 + Math.random() * 0.05 : 0.02 + Math.random() * 0.04,
      hue: colors.shapes.hueRange[0] + Math.random() * (colors.shapes.hueRange[1] - colors.shapes.hueRange[0]),
      speed: 0.05 + Math.random() * 0.15,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      type: ["circle", "triangle", "square", "hexagon"][Math.floor(Math.random() * 4)] as any,
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
      const hueShift = (scrollProgress * 60 + time * 10) % 360
      const colors = getThemeColors()

      // Clear with dynamic gradient
      const gradient = ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height)
      gradient.addColorStop(0, colors.background.start)
      gradient.addColorStop(0.25, colors.background.mid1)
      gradient.addColorStop(0.5, colors.background.mid2)
      gradient.addColorStop(0.75, colors.background.mid1)
      gradient.addColorStop(1, colors.background.end)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw floating shapes
      shapesRef.current = shapesRef.current.map((shape) => {
        const phase = shape.phase + 0.008
        const parallaxY = shape.baseY + scrollY * shape.speed
        const wrappedY = (parallaxY % (dimensions.height + shape.size * 2)) - shape.size

        const floatX = shape.x + Math.sin(phase) * 1.5
        const floatY = wrappedY + Math.cos(phase * 0.7) * 1
        const rotation = shape.rotation + shape.rotationSpeed

        // Mouse interaction
        const mouseDistance = Math.sqrt(Math.pow(mousePosition.x - floatX, 2) + Math.pow(mousePosition.y - floatY, 2))
        const mouseInfluence = Math.max(0, Math.min(1, 1 - mouseDistance / 200))
        const currentOpacity = shape.opacity + (isMouseMoving ? mouseInfluence * 0.03 : 0)

        const breathingScale = 0.8 + Math.sin(phase * 1.5) * 0.2
        const currentSize = shape.size * breathingScale

        // Draw shape
        ctx.save()
        ctx.translate(floatX, floatY)
        ctx.rotate(rotation)
        ctx.globalAlpha = currentOpacity

        const shapeGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize)
        shapeGradient.addColorStop(0, `hsl(${shape.hue}, ${colors.shapes.saturation}%, ${colors.shapes.lightness}%)`)
        shapeGradient.addColorStop(
          0.7,
          `hsl(${shape.hue}, ${colors.shapes.saturation - 10}%, ${colors.shapes.lightness - 10}%)`,
        )
        shapeGradient.addColorStop(
          1,
          `hsl(${shape.hue}, ${colors.shapes.saturation - 20}%, ${colors.shapes.lightness - 20}%)`,
        )

        ctx.fillStyle = shapeGradient
        ctx.strokeStyle = `hsl(${shape.hue}, ${colors.shapes.saturation + 10}%, ${colors.shapes.lightness + 5}%)`
        ctx.lineWidth = 1

        switch (shape.type) {
          case "circle":
            ctx.beginPath()
            ctx.arc(0, 0, currentSize * 0.5, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
            break
          case "triangle":
            ctx.beginPath()
            ctx.moveTo(0, -currentSize * 0.5)
            ctx.lineTo(-currentSize * 0.4, currentSize * 0.3)
            ctx.lineTo(currentSize * 0.4, currentSize * 0.3)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
            break
          case "square":
            ctx.fillRect(-currentSize * 0.3, -currentSize * 0.3, currentSize * 0.6, currentSize * 0.6)
            ctx.strokeRect(-currentSize * 0.3, -currentSize * 0.3, currentSize * 0.6, currentSize * 0.6)
            break
          case "hexagon":
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
            ctx.stroke()
            break
        }

        ctx.restore()

        return {
          ...shape,
          x: floatX,
          y: floatY,
          phase,
          rotation,
        }
      })

      // Update and draw particles
      particlesRef.current = particlesRef.current
        .filter((particle) => {
          const newLife = particle.life + 1
          const lifeRatio = newLife / particle.maxLife

          if (newLife < particle.maxLife) {
            const newX = particle.x + particle.vx
            const newY = particle.y + particle.vy
            const newOpacity = particle.opacity * (1 - lifeRatio)
            const newSize = particle.size * (1 - lifeRatio * 0.3)

            ctx.save()
            ctx.globalAlpha = newOpacity
            ctx.translate(newX, newY)

            const particleGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, newSize * 2)
            particleGradient.addColorStop(
              0,
              `hsl(${particle.hue}, ${colors.particles.saturation}%, ${colors.particles.lightness}%)`,
            )
            particleGradient.addColorStop(
              0.5,
              `hsl(${particle.hue}, ${colors.particles.saturation - 10}%, ${colors.particles.lightness - 10}%)`,
            )
            particleGradient.addColorStop(
              1,
              `hsl(${particle.hue}, ${colors.particles.saturation - 20}%, ${colors.particles.lightness - 20}%)`,
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
              case "bubble":
                ctx.beginPath()
                ctx.arc(0, 0, newSize, 0, Math.PI * 2)
                ctx.fill()
                break
              case "star":
                ctx.beginPath()
                for (let i = 0; i < 5; i++) {
                  const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
                  const outerRadius = newSize
                  const innerRadius = newSize * 0.4
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
              case "dot":
                ctx.beginPath()
                ctx.arc(0, 0, newSize * 0.5, 0, Math.PI * 2)
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
              vx: particle.vx * 0.98,
              vy: particle.vy * 0.98,
            }
          }
          return null
        })
        .filter(Boolean) as Particle[]

      // Update and draw waves
      wavesRef.current = wavesRef.current
        .filter((wave) => {
          const newRadius = wave.radius + wave.speed
          const newOpacity = wave.opacity * (1 - newRadius / wave.maxRadius)

          if (newRadius < wave.maxRadius && newOpacity > 0.01) {
            ctx.strokeStyle = `hsla(${180 + scrollProgress * 40}, 60%, ${resolvedTheme === "dark" ? 70 : 50}%, ${newOpacity})`
            ctx.lineWidth = wave.thickness
            ctx.beginPath()
            ctx.arc(wave.x, wave.y, newRadius, 0, Math.PI * 2)
            ctx.stroke()

            return { ...wave, radius: newRadius, opacity: newOpacity }
          }
          return null
        })
        .filter(Boolean) as WaveEffect[]

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, scrollY, scrollProgress, mousePosition, isMouseMoving, resolvedTheme])

  if (typeof window === "undefined") {
    return null
  }

  const colors = getThemeColors()

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "multiply" }} />

      {/* Enhanced gradient overlays */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(circle at 15% 85%, ${colors.overlays.primary} 0%, transparent 60%),
            radial-gradient(circle at 85% 15%, ${colors.overlays.secondary} 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, ${colors.overlays.tertiary} 0%, transparent 70%),
            linear-gradient(135deg, 
              ${colors.overlays.primary} 0%, 
              ${colors.overlays.secondary} 25%,
              ${colors.overlays.tertiary} 50%,
              ${colors.overlays.secondary} 75%,
              ${colors.overlays.primary} 100%)
          `,
        }}
      />

      {/* Animated mesh pattern */}
      <div
        className={`absolute inset-0 ${resolvedTheme === "dark" ? "opacity-[0.02]" : "opacity-[0.04]"} mix-blend-overlay`}
        style={{
          backgroundImage: `
            linear-gradient(45deg, ${resolvedTheme === "dark" ? "#14b8a6" : "#0d9488"} 1px, transparent 1px),
            linear-gradient(-45deg, ${resolvedTheme === "dark" ? "#3b82f6" : "#2563eb"} 1px, transparent 1px),
            linear-gradient(90deg, ${resolvedTheme === "dark" ? "#8b5cf6" : "#7c3aed"} 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px, 30px 30px, 60px 60px",
          backgroundPosition: "0 0, 15px 15px, 0 0",
          animation: "mesh-move 20s linear infinite",
        }}
      />

      {/* Readability overlay */}
      <div className={`absolute inset-0 ${colors.readability} dark:${colors.readability}`} />
    </div>
  )
}
