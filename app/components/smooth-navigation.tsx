"use client"

import { useEffect, useState, useCallback, useRef } from "react"

interface NavigationItem {
  id: string
  label: string
  href: string
}

interface SmoothNavigationProps {
  items: NavigationItem[]
  offset?: number
  duration?: number
  easing?: string
}

export default function SmoothNavigation({
  items,
  offset = 80,
  duration = 800,
  easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
}: SmoothNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("")
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const observerRef = useRef<IntersectionObserver>()

  const scrollToSection = useCallback(
    (targetId: string, customOffset?: number) => {
      const targetElement = document.getElementById(targetId)
      if (!targetElement) return

      setIsScrolling(true)

      const headerHeight = customOffset ?? offset
      const targetPosition = targetElement.offsetTop - headerHeight
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      const startTime = performance.now()

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smooth animation
        const easeInOutCubic = (t: number) => {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        }

        const easedProgress = easeInOutCubic(progress)
        const currentPosition = startPosition + distance * easedProgress

        window.scrollTo(0, currentPosition)

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        } else {
          setIsScrolling(false)
          // Update URL hash without triggering scroll
          if (history.replaceState) {
            history.replaceState(null, "", `#${targetId}`)
          }
        }
      }

      requestAnimationFrame(animateScroll)
    },
    [offset, duration],
  )

  const handleNavClick = useCallback(
    (e: Event, targetId: string) => {
      e.preventDefault()
      scrollToSection(targetId)
    },
    [scrollToSection],
  )

  // Scroll spy functionality
  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean)

    if (sections.length === 0) return

    const observerOptions = {
      root: null,
      rootMargin: `-${offset}px 0px -50% 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (isScrolling) return // Don't update during programmatic scrolling

      let maxRatio = 0
      let activeId = ""

      entries.forEach((entry) => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio
          activeId = entry.target.id
        }
      })

      if (activeId && maxRatio > 0.25) {
        setActiveSection(activeId)
      }
    }, observerOptions)

    sections.forEach((section) => {
      if (section && observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [items, offset, isScrolling])

  // Handle initial hash navigation
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && items.some((item) => item.id === hash)) {
      // Delay to ensure page is loaded
      setTimeout(() => scrollToSection(hash), 100)
    }
  }, [items, scrollToSection])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return

      const currentIndex = items.findIndex((item) => item.id === activeSection)

      switch (e.key) {
        case "ArrowDown":
        case "j":
          e.preventDefault()
          if (currentIndex < items.length - 1) {
            scrollToSection(items[currentIndex + 1].id)
          }
          break
        case "ArrowUp":
        case "k":
          e.preventDefault()
          if (currentIndex > 0) {
            scrollToSection(items[currentIndex - 1].id)
          }
          break
        case "Home":
          e.preventDefault()
          scrollToSection(items[0].id)
          break
        case "End":
          e.preventDefault()
          scrollToSection(items[items.length - 1].id)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection, items, scrollToSection])

  // Expose navigation functions globally
  useEffect(() => {
    // @ts-ignore
    window.smoothNavigate = scrollToSection
    // @ts-ignore
    window.getCurrentSection = () => activeSection
  }, [scrollToSection, activeSection])

  return {
    activeSection,
    isScrolling,
    scrollToSection,
    handleNavClick,
  }
}
