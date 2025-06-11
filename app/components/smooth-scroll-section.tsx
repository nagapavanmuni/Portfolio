"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface SmoothScrollSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  animationType?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "rotate" | "blur"
  delay?: number
  duration?: number
}

export default function SmoothScrollSection({
  children,
  className = "",
  id,
  animationType = "fadeIn",
  delay = 0,
  duration = 800,
}: SmoothScrollSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          const timer = setTimeout(() => {
            setIsVisible(true)
            hasAnimated.current = true
          }, delay)

          return () => clearTimeout(timer)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -10px 0px", // Reduced bottom margin to trigger animations sooner
      },
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [delay])

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out duration-${duration}`

    if (!isVisible) {
      switch (animationType) {
        case "fadeIn":
          return `${baseClasses} opacity-0`
        case "slideUp":
          return `${baseClasses} opacity-0 translate-y-8` // Reduced distance
        case "slideLeft":
          return `${baseClasses} opacity-0 translate-x-8` // Reduced distance
        case "slideRight":
          return `${baseClasses} opacity-0 -translate-x-8` // Reduced distance
        case "scale":
          return `${baseClasses} opacity-0 scale-95`
        case "rotate":
          return `${baseClasses} opacity-0 rotate-2 scale-95`
        case "blur":
          return `${baseClasses} opacity-0 blur-sm scale-105`
        default:
          return `${baseClasses} opacity-0`
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0 blur-0`
  }

  return (
    <section ref={sectionRef} id={id} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </section>
  )
}
