"use client"

import { useEffect, useState, useCallback, useRef } from "react"

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
}

interface Wave {
  id: number
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  speed: number
}

interface FloatingOrb {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
  opacity: number
  hue: number
  phase: number
  speed: number
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [waves, setWaves] = useState<Wave[]>([])
  const [orbs, setOrbs] = useState<FloatingOrb[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseTimeoutRef = useRef<NodeJS.Timeout>()
  const lastMouseUpdate = useRef<number>(0)

  // Soothing color palette
  const colorPalette = {
    primary: [200, 220, 240], // Soft blue
    secondary: [220, 200, 240], // Soft purple
    accent: [200, 240, 220], // Soft green
    warm: [240, 220, 200], // Soft peach
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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now()
    if (now - lastMouseUpdate.current > 16) {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMouseMoving(true)

      // Clear existing timeout
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }

      // Set mouse as not moving after 100ms of no movement
      mouseTimeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false)
      }, 100)

      lastMouseUpdate.current = now
    }
  }, [])

  const createWave = useCallback((x: number, y: number) => {
    const newWave: Wave = {
      id: Date.now() + Math.random(),
      x,
      y,
      radius: 0,
      maxRadius: 100 + Math.random() * 50,
      opacity: 0.3,
      speed: 2 + Math.random() * 2,
    }

    setWaves((prev) => [...prev.slice(-4), newWave]) // Keep only last 5 waves
  }, [])

  const handleMouseClick = useCallback(
    (e: MouseEvent) => {
      createWave(e.clientX, e.clientY)

      // Create burst of particles
      const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 3 + 1,
        opacity: 0.8,
        hue: Math.random() * 60 + 200, // Blue to purple range
        life: 0,
        maxLife: 60 + Math.random() * 40,
      }))

      setParticles((prev) => [...prev, ...newParticles])
    },
    [createWave],
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const newDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    setDimensions(newDimensions)

    // Initialize floating orbs
    const initialOrbs: FloatingOrb[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * newDimensions.width,
      y: Math.random() * newDimensions.height,
      targetX: Math.random() * newDimensions.width,
      targetY: Math.random() * newDimensions.height,
      size: Math.random() * 60 + 40,
      opacity: 0.03 + Math.random() * 0.02,
      hue: 200 + Math.random() * 60,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.2,
    }))
    setOrbs(initialOrbs)

    // Setup canvas
    if (canvasRef.current) {
      canvasRef.current.width = newDimensions.width
      canvasRef.current.height = newDimensions.height
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("click", handleMouseClick, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleMouseClick)
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }
    }
  }, [handleMouseMove, handleMouseClick, handleResize])

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      // Clear canvas with subtle gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height)
      gradient.addColorStop(0, "rgba(248, 250, 252, 0.95)")
      gradient.addColorStop(0.5, "rgba(241, 245, 249, 0.98)")
      gradient.addColorStop(1, "rgba(248, 250, 252, 0.95)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw floating orbs
      setOrbs((prevOrbs) =>
        prevOrbs.map((orb) => {
          // Gentle floating movement
          const phase = orb.phase + 0.01
          const targetInfluence = 0.02

          let newTargetX = orb.targetX
          let newTargetY = orb.targetY

          // Occasionally change target
          if (Math.random() < 0.002) {
            newTargetX = Math.random() * dimensions.width
            newTargetY = Math.random() * dimensions.height
          }

          // Mouse influence
          const mouseDistance = Math.sqrt(Math.pow(mousePosition.x - orb.x, 2) + Math.pow(mousePosition.y - orb.y, 2))

          let mouseInfluenceX = 0
          let mouseInfluenceY = 0

          if (isMouseMoving && mouseDistance < 200) {
            const influence = ((200 - mouseDistance) / 200) * 0.5
            mouseInfluenceX = (mousePosition.x - orb.x) * influence * 0.01
            mouseInfluenceY = (mousePosition.y - orb.y) * influence * 0.01
          }

          const newX = orb.x + (newTargetX - orb.x) * targetInfluence + Math.sin(phase) * 0.5 + mouseInfluenceX
          const newY = orb.y + (newTargetY - orb.y) * targetInfluence + Math.cos(phase * 0.8) * 0.3 + mouseInfluenceY

          // Draw orb with soft glow
          const orbGradient = ctx.createRadialGradient(newX, newY, 0, newX, newY, orb.size)

          const baseOpacity = orb.opacity + (isMouseMoving && mouseDistance < 150 ? 0.02 : 0)
          const pulseOpacity = baseOpacity * (0.8 + Math.sin(phase * 2) * 0.2)

          orbGradient.addColorStop(0, `hsla(${orb.hue}, 60%, 80%, ${pulseOpacity})`)
          orbGradient.addColorStop(0.4, `hsla(${orb.hue}, 50%, 70%, ${pulseOpacity * 0.6})`)
          orbGradient.addColorStop(1, `hsla(${orb.hue}, 40%, 60%, 0)`)

          ctx.fillStyle = orbGradient
          ctx.beginPath()
          ctx.arc(newX, newY, orb.size, 0, Math.PI * 2)
          ctx.fill()

          return {
            ...orb,
            x: newX,
            y: newY,
            targetX: newTargetX,
            targetY: newTargetY,
            phase,
          }
        }),
      )

      // Update and draw waves
      setWaves(
        (prevWaves) =>
          prevWaves
            .filter((wave) => {
              const newRadius = wave.radius + wave.speed
              const newOpacity = wave.opacity * (1 - newRadius / wave.maxRadius)

              if (newRadius < wave.maxRadius && newOpacity > 0.01) {
                // Draw wave
                ctx.strokeStyle = `rgba(59, 130, 246, ${newOpacity})`
                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.arc(wave.x, wave.y, newRadius, 0, Math.PI * 2)
                ctx.stroke()

                return { ...wave, radius: newRadius, opacity: newOpacity }
              }
              return null
            })
            .filter(Boolean) as Wave[],
      )

      // Update and draw particles
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
                const newSize = particle.size * (1 - lifeRatio * 0.5)

                // Draw particle
                const particleGradient = ctx.createRadialGradient(newX, newY, 0, newX, newY, newSize)
                particleGradient.addColorStop(0, `hsla(${particle.hue}, 70%, 80%, ${newOpacity})`)
                particleGradient.addColorStop(1, `hsla(${particle.hue}, 70%, 80%, 0)`)

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
                  vx: particle.vx * 0.98, // Gentle deceleration
                  vy: particle.vy * 0.98,
                }
              }
              return null
            })
            .filter(Boolean) as Particle[],
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, mousePosition, isMouseMoving])

  if (typeof window === "undefined") {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Canvas for dynamic elements */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "multiply" }} />

      {/* Subtle gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
      <div className="absolute inset-0 bg-gradient-to-tl from-green-50/20 via-transparent to-blue-50/20" />

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-white/85 dark:bg-gray-900/85" />

      {/* Subtle noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
