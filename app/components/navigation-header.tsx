"use client"

import { Button } from "@/components/ui/button"
<<<<<<< HEAD
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
=======
import { Menu, X, ExternalLink, Download } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import ScrollProgressIndicator from "./scroll-progress-indicator"
import { ThemeToggle } from "@/components/theme-toggle"

const navigationItems = [
  { id: "about", label: "About", href: "/about" },
  { id: "experience", label: "Experience", href: "/experience" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "skills", label: "Skills", href: "/skills" },
  { id: "contact", label: "Contact", href: "/contact" },
]

// Updated resume links - primary and fallback
const RESUME_LINKS = {
  primary: "https://drive.google.com/file/d/15kl4qW_Q_61jKKSr2MvdBv9Eqk8zbA9d/view?usp=drive_link",
  fallback: "https://drive.google.com/file/d/1DnokfeJA9NrTS1IZEboiIUeq4Lw92HIB/view?usp=drive_link",
  download: "/resume/naga-pavan-muni-resume.pdf",
}

export default function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [resumeLink, setResumeLink] = useState(RESUME_LINKS.primary)
  const pathname = usePathname()
>>>>>>> f85d32de63cf560b3a18dcf7cd069e6b9af11838

  // Handle scroll state for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

<<<<<<< HEAD
  const handleMobileNavClick = (targetId: string) => {
    scrollToSection(targetId)
    setIsMobileMenuOpen(false)
  }

=======
  // Test resume link accessibility
  useEffect(() => {
    const testResumeLink = async () => {
      try {
        // Try to fetch the primary link to see if it's accessible
        const response = await fetch(RESUME_LINKS.primary, { method: "HEAD", mode: "no-cors" })
        // If we get here without error, keep the primary link
        setResumeLink(RESUME_LINKS.primary)
      } catch (error) {
        // If primary link fails, use fallback
        console.warn("Primary resume link not accessible, using fallback")
        setResumeLink(RESUME_LINKS.fallback)
      }
    }

    testResumeLink()
  }, [])

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  const handleResumeClick = () => {
    // Try primary link first, then fallback
    const linkToOpen = resumeLink
    window.open(linkToOpen, "_blank", "noopener,noreferrer")
  }

  const handleDownloadResume = () => {
    // Create a download link for the local PDF
    const link = document.createElement("a")
    link.href = RESUME_LINKS.download
    link.download = "Naga-Pavan-Muni-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const isActive = (href: string) => {
    if (href === "/about" && pathname === "/") return true
    return pathname === href
  }

>>>>>>> f85d32de63cf560b3a18dcf7cd069e6b9af11838
  return (
    <>
      <ScrollProgressIndicator />
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
          isScrolled
<<<<<<< HEAD
            ? "border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-gray-200/20 dark:shadow-gray-800/20"
            : "border-gray-200/30 dark:border-gray-700/30 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl"
        } supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-gray-900/50`}
=======
            ? "border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg shadow-gray-200/20 dark:shadow-gray-800/20"
            : "border-gray-200/30 dark:border-gray-700/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
        } supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60`}
>>>>>>> f85d32de63cf560b3a18dcf7cd069e6b9af11838
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center">
<<<<<<< HEAD
            <Link
              className="flex items-center space-x-2 group"
              href="/"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("about")
              }}
            >
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-700">
=======
            <Link className="flex items-center space-x-2 group" href="/">
              <span className="font-bold text-lg bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-blue-500 group-hover:to-teal-500 transition-all duration-700">
>>>>>>> f85d32de63cf560b3a18dcf7cd069e6b9af11838
                Naga Pavan Muni
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
<<<<<<< HEAD
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e as any, item.id)}
                className={`relative text-sm font-medium transition-all duration-500 hover:scale-110 group ${
                  activeSection === item.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
=======
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-500 hover:scale-110 group ${
                  isActive(item.href)
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
>>>>>>> f85d32de63cf560b3a18dcf7cd069e6b9af11838
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
                <span
<<<<<<< HEAD
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
=======
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={handleResumeClick}
                className="hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-teal-200/50 dark:hover:shadow-teal-800/50 group"
                title="View Resume on Google Drive"
              >
                <span className="mr-2">Resume</span>
                <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownloadResume}
                className="hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-500 hover:scale-110 group"
                title="Download Resume PDF"
              >
                <Download className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
>>>>>>> f85d32de63cf560b3a18dcf7cd069e6b9af11838
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
<<<<<<< HEAD
              <button
                key={item.id}
                onClick={() => handleMobileNavClick(item.id)}
                className={`block w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all duration-500 ${
                  activeSection === item.id
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-200/20 dark:shadow-blue-800/20"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400"
=======
              <Link
                key={item.id}
                href={item.href}
                onClick={handleMobileNavClick}
                className={`block w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all duration-500 ${
                  isActive(item.href)
                    ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 shadow-lg shadow-teal-200/20 dark:shadow-teal-800/20"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-teal-600 dark:hover:text-teal-400"
>>>>>>> f85d32de63cf560b3a18dcf7cd069e6b9af11838
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-20px)",
                }}
                aria-label={`Navigate to ${item.label} section`}
              >
                <div className="flex items-center justify-between">
                  {item.label}
<<<<<<< HEAD
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
=======
                  {isActive(item.href) && <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />}
                </div>
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200/30 dark:border-gray-700/30 space-y-3">
              <Button
                variant="outline"
                onClick={handleResumeClick}
                className="w-full hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-500 group"
                title="View Resume on Google Drive"
              >
                <span className="mr-2">View Resume</span>
                <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
              <Button
                variant="ghost"
                onClick={handleDownloadResume}
                className="w-full hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-500 group"
                title="Download Resume PDF"
              >
                <span className="mr-2">Download PDF</span>
                <Download className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
>>>>>>> f85d32de63cf560b3a18dcf7cd069e6b9af11838
              </Button>
            </div>
          </nav>
        </div>
<<<<<<< HEAD
        <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
=======
>>>>>>> f85d32de63cf560b3a18dcf7cd069e6b9af11838
      </header>
    </>
  )
}
