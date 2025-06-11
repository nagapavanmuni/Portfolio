"use client"

import { useEffect, useState, useCallback, useRef } from "react"

interface ScrollParticle {
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
}

interface ParallaxOrb {
  id: number
  x: number
  y: number
  baseY: number
  size: number
  opacity: number
  hue: number
  speed: number
  phase: number
}

export default function ScrollAnimatedBackground() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | "none">("none")
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const [particles, setParticles] = useState<ScrollParticle[]>([])
  const [orbs, setOrbs] = useState<ParallaxOrb[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isScrolling, setIsScrolling] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

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
    const currentTime = Date.now()
    const deltaY = currentScrollY - lastScrollY.current
    const deltaTime = currentTime - lastScrollTime.current

    // Calculate scroll velocity
    const velocity = deltaTime > 0 ? Math.abs(deltaY) / deltaTime : 0
    setScrollVelocity(velocity)

    // Determine scroll direction
    if (Math.abs(deltaY) > 1) {
      setScrollDirection(deltaY > 0 ? "down" : "up")
      setIsScrolling(true)

      // Create particles based on scroll intensity
      if (velocity > 0.5) {
        const particleCount = Math.min(Math.floor(velocity * 3), 8)
        const newParticles: ScrollParticle[] = Array.from({ length: particleCount }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * dimensions.width,
          y: deltaY > 0 ? -10 : dimensions.height + 10,
          vx: (Math.random() - 0.5) * 2,
          vy: deltaY > 0 ? Math.random() * 3 + 1 : -(Math.random() * 3 + 1),
          size: Math.random() * 4 + 2,
          opacity: 0.6,
          hue: 200 + Math.random() * 60,
          life: 0,
          maxLife: 60 + Math.random() * 40,
        }))

        setParticles((prev) => [...prev, ...newParticles])
      }

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set scrolling to false after 150ms of no scroll
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
        setScrollDirection("none")
      }, 150)
    }

    setScrollY(currentScrollY)
    lastScrollY.current = currentScrollY
    lastScrollTime.current = currentTime
  }, [dimensions.width, dimensions.height])

  useEffect(() => {
    if (typeof window === "undefined") return

    const newDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    setDimensions(newDimensions)

    // Initialize parallax orbs
    const initialOrbs: ParallaxOrb[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * newDimensions.width,
      y: Math.random() * newDimensions.height,
      baseY: Math.random() * newDimensions.height,
      size: Math.random() * 80 + 40,
      opacity: 0.02 + Math.random() * 0.03,
      hue: 200 + Math.random() * 80,
      speed: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
    }))
    setOrbs(initialOrbs)

    // Setup canvas
    if (canvasRef.current) {
      canvasRef.current.width = newDimensions.width
      canvasRef.current.height = newDimensions.height
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll, handleResize])

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      // Clear canvas with dynamic gradient based on scroll
      const scrollProgress = Math.min(scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1)

      const gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height)

      if (scrollDirection === "down") {
        gradient.addColorStop(0, `hsla(220, 60%, 95%, ${0.95 + scrollVelocity * 0.02})`)
        gradient.addColorStop(0.5, `hsla(240, 50%, 92%, ${0.98 + scrollVelocity * 0.01})`)
        gradient.addColorStop(1, `hsla(260, 40%, 90%, ${0.95 + scrollVelocity * 0.02})`)
      } else if (scrollDirection === "up") {
        gradient.addColorStop(0, `hsla(180, 60%, 95%, ${0.95 + scrollVelocity * 0.02})`)
        gradient.addColorStop(0.5, `hsla(200, 50%, 92%, ${0.98 + scrollVelocity * 0.01})`)
        gradient.addColorStop(1, `hsla(220, 40%, 90%, ${0.95 + scrollVelocity * 0.02})`)
      } else {
        gradient.addColorStop(0, "hsla(210, 50%, 95%, 0.95)")
        gradient.addColorStop(0.5, "hsla(220, 40%, 92%, 0.98)")
        gradient.addColorStop(1, "hsla(230, 30%, 90%, 0.95)")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw parallax orbs
      setOrbs((prevOrbs) =>
        prevOrbs.map((orb) => {
          // Parallax effect based on scroll
          const parallaxY = orb.baseY + scrollY * orb.speed
          const wrappedY = (parallaxY % (dimensions.height + orb.size * 2)) - orb.size

          // Breathing effect
          const phase = orb.phase + 0.01
          const breathingScale = 0.8 + Math.sin(phase) * 0.2
          const currentSize = orb.size * breathingScale

          // Enhanced opacity during scrolling
          const scrollOpacity = isScrolling ? orb.opacity * (1 + scrollVelocity * 2) : orb.opacity
          const finalOpacity = Math.min(scrollOpacity, 0.15)

          // Draw orb with enhanced effects during scroll
          const orbGradient = ctx.createRadialGradient(orb.x, wrappedY, 0, orb.x, wrappedY, currentSize)

          if (isScrolling) {
            // More vibrant colors during scroll
            orbGradient.addColorStop(0, `hsla(${orb.hue}, 70%, 85%, ${finalOpacity})`)
            orbGradient.addColorStop(0.3, `hsla(${orb.hue}, 60%, 75%, ${finalOpacity * 0.7})`)
            orbGradient.addColorStop(1, `hsla(${orb.hue}, 50%, 65%, 0)`)
          } else {
            orbGradient.addColorStop(0, `hsla(${orb.hue}, 50%, 80%, ${finalOpacity})`)
            orbGradient.addColorStop(0.4, `hsla(${orb.hue}, 40%, 70%, ${finalOpacity * 0.6})`)
            orbGradient.addColorStop(1, `hsla(${orb.hue}, 30%, 60%, 0)`)
          }

          ctx.fillStyle = orbGradient
          ctx.beginPath()
          ctx.arc(orb.x, wrappedY, currentSize, 0, Math.PI * 2)
          ctx.fill()

          return {
            ...orb,
            y: wrappedY,
            phase,
          }
        }),
      )

      // Update and draw scroll particles
      setParticles(
        (prevParticles) =>
          prevParticles
            .filter((particle) => {
              const newLife = particle.life + 1
              const lifeRatio = newLife / particle.maxLife

              if (newLife < particle.maxLife) {
                const newX = particle.x + particle.vx
                const newY = particle.y + particle.vy
                const newOpacity = particle.opacity * (1 - lifeRatio)
                const newSize = particle.size * (1 - lifeRatio * 0.3)

                // Draw particle with trail effect
                const particleGradient = ctx.createRadialGradient(newX, newY, 0, newX, newY, newSize * 2)
                particleGradient.addColorStop(0, `hsla(${particle.hue}, 80%, 90%, ${newOpacity})`)
                particleGradient.addColorStop(0.5, `hsla(${particle.hue}, 70%, 80%, ${newOpacity * 0.5})`)
                particleGradient.addColorStop(1, `hsla(${particle.hue}, 60%, 70%, 0)`)

                ctx.fillStyle = particleGradient
                ctx.beginPath()
                ctx.arc(newX, newY, newSize, 0, Math.PI * 2)
                ctx.fill()

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
            .filter(Boolean) as ScrollParticle[],
      )

      // Draw scroll direction indicator
      if (isScrolling && scrollVelocity > 0.3) {
        const indicatorOpacity = Math.min(scrollVelocity * 0.5, 0.8)
        const indicatorSize = 20 + scrollVelocity * 10

        ctx.fillStyle =
          scrollDirection === "down"
            ? `rgba(59, 130, 246, ${indicatorOpacity})`
            : `rgba(16, 185, 129, ${indicatorOpacity})`

        // Draw subtle directional indicators at screen edges
        for (let i = 0; i < 3; i++) {
          const x = dimensions.width * (0.2 + i * 0.3)
          const y = scrollDirection === "down" ? 20 : dimensions.height - 20

          ctx.beginPath()
          ctx.arc(x, y, indicatorSize * (1 - i * 0.2), 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, scrollY, scrollDirection, scrollVelocity, isScrolling])

  if (typeof window === "undefined") {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "multiply" }} />

      {/* Dynamic overlay based on scroll direction */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          scrollDirection === "down"
            ? "bg-gradient-to-b from-blue-50/20 via-purple-50/10 to-indigo-50/20"
            : scrollDirection === "up"
              ? "bg-gradient-to-t from-green-50/20 via-cyan-50/10 to-blue-50/20"
              : "bg-gradient-to-br from-blue-50/10 via-transparent to-purple-50/10"
        }`}
      />

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80" />
    </div>
  )
}
