"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import SmoothNavigation from "./smooth-navigation"
import ScrollProgressIndicator from "./scroll-progress-indicator"
import ResumeModal from "./resume-modal"

const navigationItems = [
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
]

export default function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)

  const { activeSection, isScrolling, scrollToSection, handleNavClick } = SmoothNavigation({
    items: navigationItems,
    offset: 80,
    duration: 800,
  })

  // Handle scroll state for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMobileNavClick = (targetId: string) => {
    scrollToSection(targetId)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <ScrollProgressIndicator />
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
          isScrolled
            ? "border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-gray-200/20 dark:shadow-gray-800/20"
            : "border-gray-200/30 dark:border-gray-700/30 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl"
        } supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-gray-900/50`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              className="flex items-center space-x-2 group"
              href="/"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("about")
              }}
            >
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-700">
                Naga Pavan Muni
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e as any, item.id)}
                className={`relative text-sm font-medium transition-all duration-500 hover:scale-110 group ${
                  activeSection === item.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
                {isScrolling && activeSection === item.id && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsResumeModalOpen(true)}
              className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-800/50"
            >
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 border-t border-gray-200/30 dark:border-gray-700/30"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="container px-4 py-4 space-y-4">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleMobileNavClick(item.id)}
                className={`block w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all duration-500 ${
                  activeSection === item.id
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-200/20 dark:shadow-blue-800/20"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-20px)",
                }}
                aria-label={`Navigate to ${item.label} section`}
              >
                <div className="flex items-center justify-between">
                  {item.label}
                  {activeSection === item.id && <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
                </div>
              </button>
            ))}

            <div className="pt-4 border-t border-gray-200/30 dark:border-gray-700/30">
              <Button
                variant="outline"
                onClick={() => setIsResumeModalOpen(true)}
                className="w-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-500"
              >
                Resume
              </Button>
            </div>
          </nav>
        </div>
        <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
      </header>
    </>
  )
}
