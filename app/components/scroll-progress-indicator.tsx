"use client"

import { useEffect, useState } from "react"

export default function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      setScrollProgress(progress)
      setIsVisible(scrollTop > 100)
    }

    const throttledUpdate = () => {
      requestAnimationFrame(updateScrollProgress)
    }

    window.addEventListener("scroll", throttledUpdate, { passive: true })
    updateScrollProgress() // Initial call

    return () => window.removeEventListener("scroll", throttledUpdate)
  }, [])

  return (
    <>
      {/* Progress bar at top */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 transition-all duration-300 ease-out"
        style={{
          width: `${scrollProgress}%`,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Circular progress indicator */}
      <div
        className={`fixed bottom-8 right-8 z-40 transition-all duration-500 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
      >
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-200 dark:text-gray-700"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-blue-500"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${scrollProgress}, 100`}
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{Math.round(scrollProgress)}%</span>
          </div>
        </div>
      </div>
    </>
  )
}
