"use client"

import { useEffect, useRef } from "react"

export default function GestureScrollHandler() {
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(0)
  const velocityHistory = useRef<number[]>([])
  const ticking = useRef(false)

  useEffect(() => {
    const updateScrollInfo = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      const deltaY = currentScrollY - lastScrollY.current
      const deltaTime = currentTime - lastScrollTime.current

      if (deltaTime > 0) {
        const velocity = Math.abs(deltaY) / deltaTime

        // Smooth velocity calculation
        velocityHistory.current.push(velocity)
        if (velocityHistory.current.length > 5) {
          velocityHistory.current.shift()
        }

        const smoothVelocity = velocityHistory.current.reduce((a, b) => a + b, 0) / velocityHistory.current.length

        // Determine direction
        let direction = "none"
        if (Math.abs(deltaY) > 1) {
          direction = deltaY > 0 ? "down" : "up"
        }

        // Add CSS custom properties for scroll info
        document.documentElement.style.setProperty("--scroll-direction", direction)
        document.documentElement.style.setProperty("--scroll-velocity", smoothVelocity.toString())
      }

      lastScrollY.current = currentScrollY
      lastScrollTime.current = currentTime
      ticking.current = false
    }

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollInfo)
        ticking.current = true
      }
    }

    // Touch gesture handling for mobile
    let touchStartY = 0
    let touchStartTime = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartTime = Date.now()
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY
      const deltaTime = Date.now() - touchStartTime

      if (deltaTime > 0) {
        const velocity = Math.abs(deltaY) / deltaTime
        const direction = deltaY > 0 ? "down" : "up"

        document.documentElement.style.setProperty("--scroll-direction", direction)
        document.documentElement.style.setProperty("--scroll-velocity", (velocity * 2).toString())
      }
    }

    const handleTouchEnd = () => {
      setTimeout(() => {
        document.documentElement.style.setProperty("--scroll-direction", "none")
        document.documentElement.style.setProperty("--scroll-velocity", "0")
      }, 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  return null
}
