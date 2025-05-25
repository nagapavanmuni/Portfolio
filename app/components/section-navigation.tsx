"use client"

import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const sections = ["about", "experience", "projects", "contact"]

export default function SectionNavigation() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)

      // Find current section
      const sectionElements = sections.map((id) => document.getElementById(id)).filter(Boolean)
      const scrollPosition = window.scrollY + 100

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(i)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigateToSection = (direction: "up" | "down") => {
    const newIndex =
      direction === "up" ? Math.max(0, currentSection - 1) : Math.min(sections.length - 1, currentSection + 1)

    const targetElement = document.getElementById(sections[newIndex])
    if (targetElement) {
      const headerHeight = 80
      const targetPosition = targetElement.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-2">
      <Button
        variant="outline"
        size="icon"
        className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-110 disabled:opacity-50"
        onClick={() => navigateToSection("up")}
        disabled={currentSection === 0}
        aria-label="Navigate to previous section"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>

      <div className="flex flex-col space-y-1 py-2">
        {sections.map((section, index) => (
          <button
            key={section}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSection
                ? "bg-blue-500 scale-150"
                : "bg-gray-300 dark:bg-gray-600 hover:bg-blue-300 dark:hover:bg-blue-700"
            }`}
            onClick={() => {
              const targetElement = document.getElementById(section)
              if (targetElement) {
                const headerHeight = 80
                const targetPosition = targetElement.offsetTop - headerHeight
                window.scrollTo({
                  top: targetPosition,
                  behavior: "smooth",
                })
              }
            }}
            aria-label={`Navigate to ${section} section`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-110 disabled:opacity-50"
        onClick={() => navigateToSection("down")}
        disabled={currentSection === sections.length - 1}
        aria-label="Navigate to next section"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  )
}
