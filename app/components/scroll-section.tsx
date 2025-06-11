"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  animationType?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "rotate"
  delay?: number
}

export default function ScrollSection({
  children,
  className = "",
  id,
  animationType = "fadeIn",
  delay = 0,
}: ScrollSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [delay, hasAnimated])

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-1000 ease-out"

    if (!isVisible) {
      switch (animationType) {
        case "fadeIn":
          return `${baseClasses} opacity-0`
        case "slideUp":
          return `${baseClasses} opacity-0 translate-y-20`
        case "slideLeft":
          return `${baseClasses} opacity-0 translate-x-20`
        case "slideRight":
          return `${baseClasses} opacity-0 -translate-x-20`
        case "scale":
          return `${baseClasses} opacity-0 scale-95`
        case "rotate":
          return `${baseClasses} opacity-0 rotate-3 scale-95`
        default:
          return `${baseClasses} opacity-0`
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`
  }

  return (
    <section ref={sectionRef} id={id} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </section>
  )
}
